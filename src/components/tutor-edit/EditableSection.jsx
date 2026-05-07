import { useState } from "react"

function EditableSection({ label, children, viewContent, onSave }) {
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    async function handleClick() {
        if (!editing) {
            setEditing(true)
            return
        }
        setSaving(true)
        try {
            await onSave()
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                        {label}
                    </p>
                    {editing ? children : viewContent}
                </div>
                <button
                    onClick={handleClick}
                    disabled={saving}
                    className="border border-tl-border bg-white text-tl-ink px-4 py-2 rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                >
                    {saving ? "Saving..." : editing ? "Save" : "Edit"}
                </button>
            </div>
        </div>
    )
}

export default EditableSection