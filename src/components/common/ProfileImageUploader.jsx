import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { uploadProfileImage } from "../../services/tutorService"
import { useAuth } from "../../hooks/useAuth"

async function getCroppedImg(imageSrc, croppedAreaPixels) {
    const image = await createImageBitmap(await fetch(imageSrc).then(r => r.blob()))
    const canvas = document.createElement("canvas")
    canvas.width = 500
    canvas.height = 500
    const ctx = canvas.getContext("2d")

    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0, 0, 500, 500
    )

    return new Promise(resolve => {
        canvas.toBlob(blob => {
            resolve(new File([blob], "profile.jpg", { type: "image/jpeg" }))
        }, "image/jpeg", 0.85)
    })
}

function ProfileImageUploader({ currentImageUrl, onUploadComplete }) {
    const { accessToken } = useAuth()
    const [src, setSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    function onFileChange(e) {
        const file = e.target.files[0]
        if (!file) return
        setSrc(URL.createObjectURL(file))
        setSuccess(false)
        setError("")
    }

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    async function handleUpload() {
        if (!croppedAreaPixels) return
        setUploading(true)
        setError("")
        try {
            const file = await getCroppedImg(src, croppedAreaPixels)
            const result = await uploadProfileImage(file, accessToken)
            onUploadComplete(result.imageKey)
            setSrc(null)
            setSuccess(true)
        } catch (err) {
            setError(err.message || "Upload failed")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            {/* Current image */}
            {currentImageUrl && !src && (
                <img
                    src={currentImageUrl}
                    alt="Current profile"
                    className="w-32 h-32 rounded-full object-cover border border-tl-border"
                />
            )}

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileChange}
                className="text-sm text-tl-muted"
            />

            {/* Crop UI */}
            {src && (
                <div className="space-y-4">
                    <div className="relative w-full h-72 bg-gray-900 rounded-xl overflow-hidden">
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    {/* Zoom slider */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-tl-muted">Zoom</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={e => setZoom(Number(e.target.value))}
                            className="flex-1 accent-tl-accent"
                        />
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition disabled:opacity-70 text-sm font-medium"
                    >
                        {uploading ? "Uploading..." : "Save photo"}
                    </button>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">✓ Photo updated successfully</p>}
        </div>
    )
}

export default ProfileImageUploader