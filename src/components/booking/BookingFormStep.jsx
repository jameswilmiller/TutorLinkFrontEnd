import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getTutorSlots } from "../../services/availabilityService"
import BookingDatePicker from "./BookingDatePicker"
import PlacesAutoComplete from "../search/PlacesAutoComplete"
const DURATION_OPTIONS = [
    { value: 30, label: "30 minutes" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" },
]

const TIME_SLOTS = (() => {
    const slots = []
    for (let h = 8; h <= 21; h++) {
        for (const m of [0, 30]) {
            const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
            const hour12 = h % 12 === 0 ? 12 : h % 12
            const ampm = h < 12 ? "AM" : "PM"
            const label = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`
            slots.push({ value, label })
        }
    }
    return slots
})()

function formatSlot(value) {
    const [h, m] = value.split(":").map(Number)
    const hour12 = h % 12 === 0 ? 12 : h % 12
    const ampm = h < 12 ? "AM" : "PM"
    return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`
}

function BookingFormStep({ tutor, user, formData, fieldErrors, onChange, onNext }) {
    const { accessToken, authedRequest } = useAuth()
    const [slotInfo, setSlotInfo] = useState(null)
    const [loadingSlots, setLoadingSlots] = useState(false)

    const usesSlots = slotInfo?.hasAvailability === true

    useEffect(() => {
        if (!accessToken || !formData.bookingDate) {
            setSlotInfo(null)
            return
        }
        let cancelled = false
        setLoadingSlots(true)
        authedRequest(token =>
            getTutorSlots(tutor.id, formData.bookingDate, formData.durationMinutes, token)
        )
            .then(info => { if (!cancelled) setSlotInfo(info) })
            .catch(() => { if (!cancelled) setSlotInfo(null) })
            .finally(() => { if (!cancelled) setLoadingSlots(false) })
        return () => { cancelled = true }
    }, [accessToken, authedRequest, tutor.id, formData.bookingDate, formData.durationMinutes])

    // A previously picked time can stop being valid when the date or
    // duration changes underneath it.
    useEffect(() => {
        if (usesSlots && formData.bookingTime && !slotInfo.slots.includes(formData.bookingTime)) {
            onChange({ bookingTime: "" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slotInfo])

    const canContinue =
        formData.courseId && formData.scheduledAt && formData.durationMinutes;

    return (
        <div className="p-6 space-y-4">
            {/* Tutor summary */}
            <div className="flex items-center justify-between bg-tl-bg rounded-xl p-4">
                <div>
                    <p className="font-semibold text-tl-ink">
                        {tutor.firstname} {tutor.lastname}
                    </p>
                    <p className="text-sm text-tl-muted">
                        {tutor.courses?.map(c => c.courseCode).join(", ")}
                    </p>
                </div>
                <p className="font-display text-2xl text-tl-ink">${tutor.hourlyRate}/hr</p>
            </div>

            {/* Booking as */}
            <div className="bg-tl-bg rounded-xl p-4 text-sm">
                <p className="text-tl-muted">Booking as</p>
                <p className="text-tl-ink font-medium">{user?.firstname} {user?.lastname}</p>
                <p className="text-tl-muted text-xs">{user?.email}</p>
            </div>

            {/* Course */}
            <div>
                <label className="text-sm text-tl-muted mb-1 block" htmlFor="booking-course">
                    Which course do you need help with?
                </label>
                <select
                    id="booking-course"
                    value={formData.courseId}
                    onChange={e => onChange({ courseId: e.target.value })}
                    className={`w-full max-w-full min-w-0 truncate border rounded-xl px-4 py-3 text-sm outline-none  ${
                        fieldErrors.courseId
                            ? "border-red-400 focus:border-red-500"
                            : "border-tl-border focus:border-tl-accent"
                    }`}
                >
                    <option value="">Select a course</option>
                    {tutor.courses?.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.courseCode} — {course.courseName}
                        </option>
                    ))}
                </select>
                {fieldErrors.courseId && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.courseId}</p>
                )}
            </div>

            {/* Duration first — it decides which start times can fit */}
            <div>
                <label className="text-sm text-tl-muted mb-1 block" htmlFor="booking-duration">
                    How long?
                </label>
                <select
                    id="booking-duration"
                    value={formData.durationMinutes}
                    onChange={e => onChange({ durationMinutes: Number(e.target.value) })}
                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent cursor-pointer"
                >
                    {DURATION_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Date */}
            <div>
                <label className="text-sm text-tl-muted mb-1 block">Which day?</label>
                <BookingDatePicker
                    tutorId={tutor.id}
                    tutorName={tutor.firstname}
                    durationMinutes={formData.durationMinutes}
                    value={formData.bookingDate}
                    onSelect={date => onChange({ bookingDate: date })}
                />
            </div>

            {/* Time — open slots when the tutor has set hours, free pick otherwise */}
            <div>
                <label className="text-sm text-tl-muted mb-1 block">What time?</label>

                {!formData.bookingDate ? (
                    <p className="text-sm text-tl-muted bg-tl-bg rounded-xl p-3">
                        Pick a date to see times.
                    </p>
                ) : loadingSlots ? (
                    <p className="text-sm text-tl-muted bg-tl-bg rounded-xl p-3">
                        Checking {tutor.firstname}'s availability...
                    </p>
                ) : usesSlots ? (
                    slotInfo.slots.length === 0 ? (
                        <p className="text-sm text-tl-muted bg-tl-bg rounded-xl p-3">
                            {tutor.firstname} has no open times on this day — try another date.
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {slotInfo.slots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => onChange({ bookingTime: slot })}
                                    className={`py-2.5 rounded-xl text-sm font-medium border transition cursor-pointer ${
                                        formData.bookingTime === slot
                                            ? "bg-tl-accent text-white border-tl-accent"
                                            : "border-tl-border text-tl-ink hover:border-tl-accent"
                                    }`}
                                >
                                    {formatSlot(slot)}
                                </button>
                            ))}
                        </div>
                    )
                ) : (
                    <select
                        aria-label="Session time"
                        value={formData.bookingTime}
                        onChange={e => onChange({ bookingTime: e.target.value })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none cursor-pointer ${
                            fieldErrors.scheduledAt
                                ? "border-red-400 focus:border-red-500"
                                : "border-tl-border focus:border-tl-accent"
                        }`}
                    >
                        <option value="">Select a time</option>
                        {TIME_SLOTS.map(slot => (
                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                        ))}
                    </select>
                )}
                {fieldErrors.scheduledAt && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.scheduledAt}</p>
                )}
            </div>

            {/* Session type */}
            <div>
                <label className="text-sm text-tl-muted mb-2 block">Session type</label>
                <div className="flex gap-3">
                    {[
                        { value: "ONLINE", label: "Online" },
                        { value: "IN_PERSON", label: "In person" },
                    ].map(type => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => onChange({ sessionType: type.value })}
                            className={`flex-1 py-3 rounded-xl text-sm font-medium border transition cursor-pointer ${
                                formData.sessionType === type.value
                                    ? "bg-tl-accent text-white border-tl-accent"
                                    : "border-tl-border text-tl-ink hover:bg-tl-bg"
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* Meeting location — in-person only */}
            {formData.sessionType === "IN_PERSON" && (
                <div>
                    <label className="text-sm text-tl-muted mb-1 block">
                        Where would you like to meet? (optional)
                    </label>
                    <div className="border border-tl-border rounded-xl px-4 py-3">
                        <PlacesAutoComplete
                            onPlaceSelect={place =>
                                onChange({ meetingLocation: place.locationName })
                            }
                            initialValue={formData.meetingLocation}
                        />
                    </div>
                    <p className="mt-1 text-xs text-tl-muted">
                        Suggest a spot — your tutor will confirm or adjust it.
                    </p>
                    {fieldErrors.meetingLocation && (
                        <p className="mt-1 text-xs text-red-500">{fieldErrors.meetingLocation}</p>
                    )}
                </div>
)}
            {/* Message */}
            <div>
                <label className="text-sm text-tl-muted mb-1 block" htmlFor="booking-message">
                    Message (optional)
                </label>
                <textarea
                    id="booking-message"
                    value={formData.message}
                    onChange={e => onChange({ message: e.target.value })}
                    placeholder="e.g. I'm struggling with recursion and have an assignment due next week..."
                    rows={3}
                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
                />
                {fieldErrors.message && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>
                )}
            </div>

            <button
                onClick={onNext}
                disabled={!canContinue}
                className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Review booking
            </button>
        </div>
    )
}

export default BookingFormStep