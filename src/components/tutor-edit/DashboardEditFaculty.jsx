import { useState } from "react"
import EditableSection from "./EditableSection"

const FACULTIES = [
    "Business, Economics & Law",
    "Engineering, Architecture & IT",
    "Health, Medicine & Behavioural Sciences",
    "Humanities, Arts & Social Sciences",
    "Science",
]

function DashboardEditFaculty({ tutor, onSave }) {
    const [selected, setSelected] = useState(tutor.faculties || [])

    function toggle(f) {
        setSelected(prev =>
            prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
        )
    }

    return (
        <EditableSection
            label="Faculties"
            onSave={() => onSave({ faculties: selected })}
            viewContent={
                (tutor.faculties || []).length ? (
                    <div className="flex flex-wrap gap-2">
                        {tutor.faculties.map(f => (
                            <span key={f} className="text-xs bg-tl-bg border border-tl-border rounded-full px-3 py-1 text-tl-ink">
                                {f}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-tl-muted">No faculties selected</p>
                )
            }
        >
            <div className="space-y-2">
                {FACULTIES.map(f => (
                    <label key={f} className="flex items-center gap-2 text-sm text-tl-ink cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selected.includes(f)}
                            onChange={() => toggle(f)}
                            className="accent-tl-accent"
                        />
                        {f}
                    </label>
                ))}
            </div>
        </EditableSection>
    )
}

export default DashboardEditFaculty