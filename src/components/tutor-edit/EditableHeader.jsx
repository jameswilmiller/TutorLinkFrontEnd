import { useState, useRef } from "react"
import { getTutorImage } from "../../utils/getTutorImage"
import ProfileImageUploader from "../common/ProfileImageUploader"

const FACULTIES = [
    { label: "Business, Economics & Law", value: "BUSINESS_ECONOMICS_LAW" },
    { label: "Engineering, Architecture & IT", value: "ENGINEERING_ARCHITECTURE_IT" },
    { label: "Health, Medicine & Behavioural Sciences", value: "HEALTH_MEDICINE_BEHAVIOURAL_SCIENCES" },
    { label: "Humanities, Arts & Social Sciences", value: "HUMANITIES_ARTS_SOCIAL_SCIENCES" },
    { label: "Science", value: "SCIENCE" },
]

function EditableHeader({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [editingPhoto, setEditingPhoto] = useState(false)
    const [tagline, setTagline] = useState(tutor.tagline || "")
    const [faculties, setFaculties] = useState(tutor.faculties || [])
    const [saving, setSaving] = useState(false)

    function toggleFaculty(value) {
        setFaculties(prev =>
            prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
        )
    }

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ tagline, faculties })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex gap-6 items-start">
            {/* Clickable profile image */}
            <div className="shrink-0">
                <div
                    className="relative h-48 w-48 rounded-full cursor-pointer group"
                    onClick={() => setEditingPhoto(true)}
                >
                    <img
                        src={getTutorImage(tutor)}
                        alt={tutor.firstname}
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png" }}
                        className="h-48 w-48 rounded-full object-cover border border-tl-border"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <p className="text-white text-xs font-medium">Change photo</p>
                    </div>
                </div>

                {/* Photo upload modal */}
                {editingPhoto && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-tl-ink">Change profile photo</h3>
                                <button
                                    onClick={() => setEditingPhoto(false)}
                                    className="text-tl-muted hover:text-tl-ink"
                                >
                                    ✕
                                </button>
                            </div>
                            <ProfileImageUploader
                                currentImageUrl={getTutorImage(tutor)}
                                onUploadComplete={key => {
                                    onSave({ profileImageKey: key })
                                    setEditingPhoto(false)
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1">
                {editing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-tl-muted uppercase tracking-wide mb-1 block">Faculties</label>
                            <div className="space-y-2">
                                {FACULTIES.map(f => (
                                    <label key={f.value} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={faculties.includes(f.value)}
                                            onChange={() => toggleFaculty(f.value)}
                                            className="accent-tl-accent"
                                        />
                                        <span className="text-sm text-tl-ink">{f.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-tl-muted uppercase tracking-wide mb-1 block">Tagline</label>
                            <input
                                type="text"
                                value={tagline}
                                onChange={e => setTagline(e.target.value)}
                                className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover disabled:opacity-70">
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button onClick={() => setEditing(false)} className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-tl-muted font-bold uppercase tracking-wide">
                            {tutor.faculties?.map(f => f.replace(/_/g, " ")).join(", ")}
                        </p>
                        <h1 className="font-display text-display-2xl text-tl-ink mt-1">
                            {tutor.firstname} {tutor.lastname}
                        </h1>
                        {tutor.tagline && (
                            <p className="mt-2 font-display text-tl-muted text-heading-md italic">
                                "{tutor.tagline}"
                            </p>
                        )}
                        <button onClick={() => setEditing(true)} className="mt-3 text-sm text-tl-accent hover:underline">
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditableHeader