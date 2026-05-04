import { useState } from "react"

function EditableStyles({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [styles, setStyles] = useState(tutor.styles?.map(s => ({ label: s.label, description: s.description })) || [])
    const [saving, setSaving] = useState(false)

    function addStyle() { setStyles(prev => [...prev, { label: "", description: "" }]) }
    function removeStyle(i) { setStyles(prev => prev.filter((_, idx) => idx !== i)) }
    function updateStyle(i, field, value) {
        setStyles(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
    }

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ styles })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-2xl text-tl-ink">Teaching style</h2>
                {!editing && (
                    <button onClick={() => setEditing(true)} className="text-sm text-tl-accent hover:underline">Edit</button>
                )}
            </div>

            {editing ? (
                <div className="space-y-3">
                    {styles.map((style, i) => (
                        <div key={i} className="border border-tl-border rounded-xl p-4 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={style.label}
                                    onChange={e => updateStyle(i, "label", e.target.value)}
                                    placeholder="e.g. Patient"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <button onClick={() => removeStyle(i)} className="text-tl-muted hover:text-red-500 px-2">×</button>
                            </div>
                            <input
                                type="text"
                                value={style.description}
                                onChange={e => updateStyle(i, "description", e.target.value)}
                                placeholder="e.g. No question is too small"
                                className="w-full border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                        </div>
                    ))}
                    <button onClick={addStyle} className="text-sm text-tl-accent hover:underline">+ Add style</button>
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover disabled:opacity-70">
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <button onClick={() => setEditing(false)} className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {tutor.styles?.map(style => (
                        <div key={style.id} className="border border-tl-border rounded-xl p-4 bg-white">
                            <p className="font-semibold text-tl-ink">{style.label}</p>
                            <p className="text-sm text-tl-muted mt-1">{style.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EditableStyles