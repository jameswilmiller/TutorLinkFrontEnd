import { useState } from "react"
import EditableSection from "./EditableSection"
import PlacesAutoComplete from "../search/PlacesAutoComplete"

function DashboardEditLocation({ tutor, onSave }) {
    const [location, setLocation] = useState({
        location: tutor.location || "",
        latitude: tutor.latitude,
        longitude: tutor.longitude,
    })

    return (
        <EditableSection
            label="Location"
            viewContent={<p className="text-sm text-tl-ink">{tutor.location || "—"}</p>}
            onSave={() => onSave(location)}
        >
            <div className="border border-tl-border rounded-xl px-4 py-2">
                <PlacesAutoComplete
                    onPlaceSelect={place => setLocation({
                        location: place.locationName,
                        latitude: place.latitude,
                        longitude: place.longitude,
                    })}
                    initialValue={location.location}
                />
            </div>
        </EditableSection>
    )
}

export default DashboardEditLocation