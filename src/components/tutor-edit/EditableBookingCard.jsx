import { useState } from "react"
import PlacesAutoComplete from "../search/PlacesAutoComplete"

function EditableBookingCard({ tutor, onSave }) {
    const [editing, setEditing] = useState(false)
    const [hourlyRate, setHourlyRate] = useState(tutor.hourlyRate || "")
    const [remote, setRemote] = useState(tutor.remote || false)
    const [location, setLocation] = useState(tutor.location || "")
    const [latitude, setLatitude] = useState(tutor.latitude || null)
    const [longitude, setLongitude] = useState(tutor.longitude || null)
    const [saving, setSaving] = useState(false)

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ hourlyRate, remote, location, latitude, longitude })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="border border-tl-border rounded-2xl p-6 bg-white">
            {editing ? (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-tl-muted uppercase tracking-wide mb-1 block">Hourly rate ($)</label>
                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={e => setHourlyRate(e.target.value)}
                            className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm outline-none focus:border-tl-accent"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-tl-muted uppercase tracking-wide mb-1 block">Location</label>
                        <div className="border border-tl-border rounded-xl px-4 py-2">
                            <PlacesAutoComplete
                                onPlaceSelect={place => {
                                    setLocation(place.locationName)
                                    setLatitude(place.latitude)
                                    setLongitude(place.longitude)
                                }}
                                initialValue={location}
                            />
                        </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={remote}
                            onChange={e => setRemote(e.target.checked)}
                            className="accent-tl-accent"
                        />
                        <span className="text-sm text-tl-ink">Online sessions available</span>
                    </label>
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
                <div>
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-display text-4xl text-tl-ink">${tutor.hourlyRate}</span>
                        <span className="text-tl-muted text-sm">/ hour</span>
                    </div>
                    <p className="text-sm text-tl-muted mt-1">{tutor.location}</p>
                    <p className="text-sm text-tl-muted">{tutor.remote ? "Online sessions available" : "In-person only"}</p>
                    <button onClick={() => setEditing(true)} className="mt-3 text-sm text-tl-accent hover:underline">
                        Edit
                    </button>
                </div>
            )}
        </div>
    )
}

export default EditableBookingCard