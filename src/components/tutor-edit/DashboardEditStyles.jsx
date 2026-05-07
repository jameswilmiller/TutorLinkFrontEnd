import { useState } from "react"
import EditableSection from "./EditableSection"

function DashboardEditStyles({ tutor, onSave }) {
    const [styles, setStyles] = useState(
        tutor.styles?.map(s => ({ label: s.label, description: s.description })) || []
    )

    function add() { setStyles(prev => [...prev, { label: "", description: "" }]) }
    function remove(i) { setStyles(prev => prev.filter((_, idx) => idx !== i)) }
    function update(i, field, value) {
        setStyles(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
    }

    const viewContent = styles.length === 0
        ? <p className="text-sm text-tl-muted">No teaching styles added yet.</p>
        : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {styles.map((s, i) => (
                    <div key={i} className="border border-tl-border rounded-xl p-3">
                        <p className="font-semibold text-tl-ink text-sm">{s.label}</p>
                        <p className="text-xs text-tl-muted mt-1">{s.description}</p>
                    </div>
                ))}
            </div>
        )

    return (
        <EditableSection
            label="Teaching Styles"
            viewContent={viewContent}
            onSave={() => onSave({ styles })}
        >
            <div className="space-y-3">
                {styles.map((style, i) => (
                    <div key={i} className="border border-tl-border rounded-xl p-3 space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={style.label}
                                onChange={e => update(i, "label", e.target.value)}
                                placeholder="e.g. Patient"
                                className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                            <button onClick={() => remove(i)} className="text-tl-muted hover:text-red-500 px-2">×</button>
                        </div>
                        <input
                            type="text"
                            value={style.description}
                            onChange={e => update(i, "description", e.target.value)}
                            placeholder="e.g. No question is too small"
                            className="w-full border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                        />
                    </div>
                ))}
                <button onClick={add} className="text-sm text-tl-accent hover:underline">+ Add style</button>
            </div>
        </EditableSection>
    )
}

export default DashboardEditStyles