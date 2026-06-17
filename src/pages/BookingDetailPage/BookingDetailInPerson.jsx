import { useAuth } from "../../hooks/useAuth"
import { useState } from "react";
import { updateMeetingLocation } from "../../services/bookingService";
import PlacesAutoComplete from "../../components/search/PlacesAutoComplete";

function BookingDetailInPerson({booking, isTutor, canEdit, onSaved}) {
    const {accessToken} = useAuth();
    const [locationInput, setLocationInput] = useState("")
    const [locationSaving, setLocationSaving] = useState(false)
    const [locationError, setLocationError] = useState("")
    

    async function handleSaveLocation() {
        setLocationSaving(true)
        setLocationError("")
        try {
            const updated = await updateMeetingLocation(booking.id, locationInput, accessToken)
            onSaved(updated)
        } catch (err) {
            setLocationError(err.message || "Failed to save meeting location")
        } finally {
            setLocationSaving(false)
        }
    }

    return (
            <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
                <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                    Meeting location
                </p>

                {canEdit ? (
                    <>
                        {booking.meetingLocation && (
                            <p className="text-sm text-tl-muted mb-2">
                                {booking.locationProposedByStudent ? (
                                    <>
                                        {booking.studentName.split(" ")[0]} proposed{" "}
                                        <span className="text-tl-ink font-medium">{booking.meetingLocation}</span>.
                                        Keep it or change it below.
                                    </>
                                ) : (
                                    <>
                                        Current location:{" "}
                                        <span className="text-tl-ink font-medium">{booking.meetingLocation}</span>.
                                        Change it below if needed.
                                    </>
                                )}
                            </p>
                        )}
                        <div className="border border-tl-border rounded-xl px-4 py-3 mb-2">
                            <PlacesAutoComplete
                                onPlaceSelect={place => setLocationInput(place.locationName)}
                                initialValue={booking.meetingLocation || ""}
                            />
                        </div>
                        {locationError && <p className="text-sm text-red-500 mb-2">{locationError}</p>}
                        <button
                            onClick={handleSaveLocation}
                            disabled={locationSaving || locationInput === (booking.meetingLocation || "")}
                            className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                        >
                            {locationSaving ? "Saving..." : "Save meeting location"}
                        </button>
                        <p className="text-xs text-tl-muted mt-3">
                            {booking.studentName.split(" ")[0]} will be emailed when you save.
                        </p>
                    </>
                ) : booking.meetingLocation ? (
                    <div className="flex items-start gap-3">
                        <span className="text-xl">📍</span>
                        <div>
                            <p className="font-semibold text-tl-ink">{booking.meetingLocation}</p>
                            <p className="text-sm text-tl-muted">
                                {booking.status === "PENDING"
                                    ? (isTutor
                                        ? (booking.locationProposedByStudent
                                            ? "Proposed by the student · you can adjust this after accepting"
                                            : "You can adjust this after accepting")
                                        : "You proposed this · your tutor will confirm")
                                    : `Confirmed · contact your ${isTutor ? "student" : "tutor"} for changes`}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-tl-muted text-sm">
                        {isTutor
                            ? "No location proposed. You can set one after accepting."
                            : "No location set yet — your tutor will confirm one."}
                    </p>
                )}
            </div>
            )
}
export default BookingDetailInPerson