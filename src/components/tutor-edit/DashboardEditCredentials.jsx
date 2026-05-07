import { useState } from "react"
import EditableSection from "./EditableSection"

function DashboardEditCredentials({ tutor, onSave }) {
    const [credentials, setCredentials] = useState(
        tutor.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || []
    )

    function add() { setCredentials(prev => [...prev, { title: "", institution: "", year: "" }]) }
    function remove(i) { setCredentials(prev => prev.filter((_, idx) => idx !== i)) }
    function update(i, field, value) {
        setCredentials(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c))
    }

    const viewContent = credentials.length === 0
        ? <p className="text-sm text-tl-muted">No credentials added yet. Add your degree, completed courses, or relevant qualifications.</p>
        : (
            <div className="space-y-2">
                {credentials.map((c, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-tl-ink">{c.title}</span>
                        <span className="text-tl-muted">{c.institution}{c.year ? `, ${c.year}` : ""}</span>
                    </div>
                ))}
            </div>
        )

    return (
        <EditableSection
            label="Credentials"
            viewContent={viewContent}
            onSave={() => onSave({ credentials })}
        >
            <div className="space-y-3">
                {credentials.map((cred, i) => (
                    <div key={i} className="border border-tl-border rounded-xl p-3 space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={cred.title}
                                onChange={e => update(i, "title", e.target.value)}
                                placeholder="e.g. BSc Computer Science"
                                className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                            <button onClick={() => remove(i)} className="text-tl-muted hover:text-red-500 px-2">×</button>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={cred.institution}
                                onChange={e => update(i, "institution", e.target.value)}
                                placeholder="Institution"
                                className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                            <input
                                type="number"
                                value={cred.year}
                                onChange={e => update(i, "year", e.target.value)}
                                placeholder="Year"
                                className="w-24 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                        </div>
                    </div>
                ))}
                <button onClick={add} className="text-sm text-tl-accent hover:underline">+ Add credential</button>
            </div>
        </EditableSection>
    )
}

export default DashboardEditCredentials