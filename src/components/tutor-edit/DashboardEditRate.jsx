import { useState } from "react"
import EditableSection from "./EditableSection"

function DashboardEditRate({ tutor, onSave }) {
    const [hourlyRate, setHourlyRate] = useState(tutor.hourlyRate || "")

    return (
        <EditableSection
            label="Rate ($/hr)"
            viewContent={<p className="text-sm text-tl-ink">{tutor.hourlyRate || "—"}</p>}
            onSave={() => onSave({ hourlyRate })}
        >
            <input
                type="number"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm outline-none focus:border-tl-accent"
            />
        </EditableSection>
    )
}

export default DashboardEditRate