import { useState } from "react"

function EditableAbout({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [bio, setBio] = useState(tutor.bio || "")
    const [saving, setSaving] = useState(false)

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ bio })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-2xl text-tl-ink">About</h2>
                {!editing && (
                    <button onClick={() => setEditing(true)} className="text-sm text-tl-accent hover:underline">
                        Edit
                    </button>
                )}
            </div>

            {editing ? (
                <div className="space-y-3">
                    <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        rows={6}
                        className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
                    />
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
                <p className="text-tl-ink leading-relaxed">{tutor.bio || "No bio provided."}</p>
            )}
        </div>
    )
}

export default EditableAbout