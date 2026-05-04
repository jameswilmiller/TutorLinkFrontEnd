import { useState } from "react"

function EditableCredentials({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [credentials, setCredentials] = useState(tutor.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || [])
    const [saving, setSaving] = useState(false)

    function addCredential() { setCredentials(prev => [...prev, { title: "", institution: "", year: "" }]) }
    function removeCredential(i) { setCredentials(prev => prev.filter((_, idx) => idx !== i)) }
    function updateCredential(i, field, value) {
        setCredentials(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c))
    }

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ credentials })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="border border-tl-border rounded-2xl p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">Credentials</p>
                {!editing && (
                    <button onClick={() => setEditing(true)} className="text-sm text-tl-accent hover:underline">Edit</button>
                )}
            </div>

            {editing ? (
                <div className="space-y-3">
                    {credentials.map((cred, i) => (
                        <div key={i} className="border border-tl-border rounded-xl p-3 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={cred.title}
                                    onChange={e => updateCredential(i, "title", e.target.value)}
                                    placeholder="e.g. BSc Computer Science"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <button onClick={() => removeCredential(i)} className="text-tl-muted hover:text-red-500 px-2">×</button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={cred.institution}
                                    onChange={e => updateCredential(i, "institution", e.target.value)}
                                    placeholder="Institution"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <input
                                    type="number"
                                    value={cred.year}
                                    onChange={e => updateCredential(i, "year", e.target.value)}
                                    placeholder="Year"
                                    className="w-24 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                            </div>
                        </div>
                    ))}
                    <button onClick={addCredential} className="text-sm text-tl-accent hover:underline">+ Add credential</button>
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
                <div className="space-y-3">
                    {tutor.credentials?.map(cred => (
                        <div key={cred.id} className="flex justify-between text-sm">
                            <span className="text-tl-ink">{cred.title}</span>
                            <span className="text-tl-muted text-right ml-4">
                                {cred.institution}{cred.year ? `, ${cred.year}` : ""}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EditableCredentials