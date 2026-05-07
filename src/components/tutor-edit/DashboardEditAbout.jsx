import { useState } from "react"
import EditableSection from "./EditableSection"

function DashboardEditAbout({ tutor, onSave }) {
    const [bio, setBio] = useState(tutor.bio || "")

    return (
        <EditableSection
            label="About"
            viewContent={<p className="text-sm text-tl-ink">{tutor.bio || "—"}</p>}
            onSave={() => onSave({ bio })}
        >
            <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
            />
        </EditableSection>
    )
}

export default DashboardEditAbout