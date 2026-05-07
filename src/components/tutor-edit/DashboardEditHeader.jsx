import { useState } from "react"
import { getTutorImage } from "../../utils/getTutorImage"
import ProfileImageUploader from "../common/ProfileImageUploader"

function DashboardEditHeader({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [editingPhoto, setEditingPhoto] = useState(false)
    const [tagline, setTagline] = useState(tutor.tagline || "")
    const [saving, setSaving] = useState(false)

    async function handleClick() {
        if (!editing) {
            setEditing(true)
            return
        }
        setSaving(true)
        try {
            await onSave({ tagline })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Profile Header
            </p>

            <div className="flex gap-6">
                <div
                    onClick={() => setEditingPhoto(true)}
                    className="relative w-24 h-24 rounded-full cursor-pointer group shrink-0"
                >
                    <img
                        src={getTutorImage(tutor)}
                        alt={tutor.firstname}
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png" }}
                        className="w-24 h-24 rounded-full object-cover border border-tl-border"
                    />
                    <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-tl-accent border-2 border-white flex items-center justify-center text-white text-xs">
                        ✎
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div>
                        <label className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-1 block">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={`${tutor.firstname} ${tutor.lastname}`}
                            disabled
                            className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm bg-tl-bg text-tl-ink cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-1 block">
                            Tagline / Quote
                        </label>
                        {editing ? (
                            <input
                                type="text"
                                value={tagline}
                                onChange={e => setTagline(e.target.value)}
                                className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                        ) : (
                            <p className="text-sm text-tl-ink py-2">{tutor.tagline || "—"}</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleClick}
                    disabled={saving}
                    className="self-start border border-tl-border bg-white text-tl-ink px-4 py-2 rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                >
                    {saving ? "Saving..." : editing ? "Save" : "Edit"}
                </button>
            </div>

            {editingPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-tl-ink">Change profile photo</h3>
                            <button onClick={() => setEditingPhoto(false)} className="text-tl-muted hover:text-tl-ink">✕</button>
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
    )
}

export default DashboardEditHeader