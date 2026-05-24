import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import {
    getBookingById,
    acceptBooking,
    declineBooking,
    cancelBooking,
    completeBooking,
    updateMeetingLink,
    updateMeetingLocation,
} from "../services/bookingService"
import { bookingHasReview, getMyReviews } from "../services/reviewsService"
import BookingStatusBadge from "../components/booking/BookingStatusBadge"
import PlacesAutoComplete from "../components/search/PlacesAutoComplete"
import ReviewForm from "../components/review/ReviewForm"
import ReviewSummary from "../components/review/ReviewSummary"

const SESSION_TYPE_LABELS = {
    ONLINE: "Online",
    IN_PERSON: "In Person",
}

function initials(name) {
    if (!name) return "?"
    return name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase()
}

function formatDate(value) {
    if (!value) return ""
    return new Date(value).toLocaleDateString(undefined, {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
    })
}

function formatTime(value) {
    if (!value) return ""
    return new Date(value).toLocaleTimeString(undefined, {
        hour: "numeric", minute: "2-digit",
    })
}

function BookingDetailPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { accessToken, user } = useAuth()

    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionLoading, setActionLoading] = useState(false)

    const [linkInput, setLinkInput] = useState("")
    const [linkSaving, setLinkSaving] = useState(false)
    const [linkError, setLinkError] = useState("")

    const [locationInput, setLocationInput] = useState("")
    const [locationSaving, setLocationSaving] = useState(false)
    const [locationError, setLocationError] = useState("")

    const [review, setReview] = useState(null)
    const [reviewChecked, setReviewChecked] = useState(false)

    useEffect(() => {
        
        async function load() {
            try {
                setLoading(true)
                setError("")
                const data = await getBookingById(id, accessToken)
                setBooking(data)
                setLinkInput(data.meetingLink || "")
                setLocationInput(data.meetingLocation || "")

                if (data.status === "COMPLETED" && user?.id === data.studentId) {
                    try {
                        const { exists } = await bookingHasReview(data.id)
                        if (exists) {
                            const mine = await getMyReviews(accessToken)
                            setReview(mine.find(r => r.bookingId === data.id) || null)
                        }
                    } catch {
                        // non-fatal
                    }
                }
                setReviewChecked(true)
            } catch (err) {
                setError(err.message || "Failed to load booking")
            } finally {
                setLoading(false)
            }
        }
        if (id && accessToken) load()
    }, [id, accessToken, user])

    async function runAction(actionFn) {
        setActionLoading(true)
        setError("")
        try {
            const updated = await actionFn(booking.id, accessToken)
            setBooking(updated)
        } catch (err) {
            setError(err.message || "Action failed")
        } finally {
            setActionLoading(false)
        }
    }

    async function handleSaveLink() {
        setLinkSaving(true)
        setLinkError("")
        try {
            const updated = await updateMeetingLink(booking.id, linkInput, accessToken)
            setBooking(updated)
        } catch (err) {
            setLinkError(err.message || "Failed to save meeting link")
        } finally {
            setLinkSaving(false)
        }
    }

    async function handleSaveLocation() {
        setLocationSaving(true)
        setLocationError("")
        try {
            const updated = await updateMeetingLocation(booking.id, locationInput, accessToken)
            setBooking(updated)
        } catch (err) {
            setLocationError(err.message || "Failed to save meeting location")
        } finally {
            setLocationSaving(false)
        }
    }

    if (loading) return <p className="py-10 text-center">Loading booking...</p>
    if (error && !booking) return <p className="py-10 text-center text-red-500">{error}</p>
    if (!booking) return null
    
    const isTutor = user?.id === booking.tutorId
    const isStudent = user?.id === booking.studentId

    const otherName = isTutor ? booking.studentName : booking.tutorName
    const otherEmail = isTutor ? booking.studentEmail : booking.tutorEmail
    const otherFirst = otherName ? otherName.split(" ")[0] : ""

    const canAcceptDecline = isTutor && booking.status === "PENDING"
    const canComplete = isTutor && booking.status === "ACCEPTED"
    const canCancel = isStudent && (booking.status === "PENDING" || booking.status === "ACCEPTED")
    const canTutorCancel = isTutor && booking.status === "ACCEPTED"
    const canEdit = isTutor && booking.status === "ACCEPTED"

    const isOnline = booking.sessionType === "ONLINE"

    const hours = (booking.durationMinutes || 0) / 60
    const earnings = booking.tutorHourlyRate != null ? booking.tutorHourlyRate * hours : null
    
    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-tl-muted hover:text-tl-ink transition cursor-pointer"
            >
                Back to bookings
            </button>

            {/* Header card */}
            <div className="bg-white border border-tl-border rounded-2xl p-6 mt-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-tl-accent text-white flex items-center justify-center font-semibold text-lg shrink-0">
                            {initials(otherName)}
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">
                                Booking {isTutor ? "from" : "with"}
                            </p>
                            <h1 className="font-display text-3xl text-tl-ink leading-tight">
                                {otherName}
                            </h1>
                            <p className="text-sm text-tl-muted">{otherEmail}</p>
                        </div>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                </div>

                <div className="bg-tl-bg rounded-xl p-5 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                    <GridCell label="Course" value={booking.courseCode} />
                    <GridCell label="Date" value={formatDate(booking.scheduledAt)} />
                    <GridCell
                        label="Time"
                        value={`${formatTime(booking.scheduledAt)} · ${booking.durationMinutes} min`}
                    />
                    <GridCell
                        label="Mode"
                        value={SESSION_TYPE_LABELS[booking.sessionType] || booking.sessionType}
                    />
                    <GridCell label="Requested" value={formatDate(booking.createdAt)} />
                    {isTutor && earnings != null && (
                        <GridCell
                            label="You'll earn"
                            value={`$${earnings % 1 === 0 ? earnings : earnings.toFixed(2)}`}
                        />
                    )}
                </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Action panel — tutor, pending */}
            {canAcceptDecline && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="font-semibold text-tl-ink">Respond to this request</p>
                        <p className="text-sm text-tl-muted mt-1">
                            {otherFirst} is waiting to hear back.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => runAction(declineBooking)}
                            disabled={actionLoading}
                            className="px-5 py-3 bg-white border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                        >
                            Decline
                        </button>
                        <button
                            onClick={() => runAction(acceptBooking)}
                            disabled={actionLoading}
                            className="px-5 py-3 bg-tl-accent text-white rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                        >
                            Accept booking
                        </button>
                    </div>
                </div>
            )}

            {/* Connection: online → meeting link, in-person → meeting location */}
            {isOnline ? (
                (booking.meetingLink || canEdit) && (
                    <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
                        <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                            Meeting link
                        </p>
                        {canEdit ? (
                            <>
                                <input
                                    type="text"
                                    value={linkInput}
                                    onChange={e => setLinkInput(e.target.value)}
                                    placeholder="https://zoom.us/j/..."
                                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent mb-2"
                                />
                                {linkError && <p className="text-sm text-red-500 mb-2">{linkError}</p>}
                                <button
                                    onClick={handleSaveLink}
                                    disabled={linkSaving || linkInput === (booking.meetingLink || "")}
                                    className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                                >
                                    {linkSaving ? "Saving..." : "Save meeting link"}
                                </button>
                                <p className="text-xs text-tl-muted mt-3">
                                    {otherFirst} will be emailed when you save.
                                </p>
                            </>
                        ) : booking.meetingLink ? (
                            <a
                                href={booking.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-tl-accent hover:underline break-all"
                            >
                                {booking.meetingLink}
                            </a>
                        ) : (
                            <p className="text-tl-muted text-sm">No meeting link yet.</p>
                        )}
                    </div>
                )
           ) : (
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
            )}

            {/* Message */}
            {booking.message && (
                <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
                    <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                        Message from {booking.studentName}
                    </p>
                    <p className="text-tl-ink whitespace-pre-wrap">"{booking.message}"</p>
                </div>
            )}

            {/* Review — student, completed */}
            {isStudent && booking.status === "COMPLETED" && reviewChecked && (
                review ? (
                    <div className="mt-6">
                        <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                            Your review
                        </p>
                        <ReviewSummary review={review} />
                    </div>
                ) : (
                    <ReviewForm bookingId={booking.id} onReviewed={setReview} />
                )
            )}

            {/* Manage booking */}
            <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
                <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                    Manage booking
                </p>
                <div className="flex flex-wrap gap-3">
                    <a
                        href={`mailto:${otherEmail}`}
                        className="inline-block px-4 py-2 border border-tl-border rounded-xl text-sm text-tl-ink hover:bg-tl-bg transition"
                    >
                        Message {otherFirst}
                    </a>
                    {canComplete && (
                        <button
                            onClick={() => runAction(completeBooking)}
                            disabled={actionLoading}
                            className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                        >
                            Mark as complete
                        </button>
                    )}
                    {(canCancel || canTutorCancel) && (
                        <button
                            onClick={() => runAction(cancelBooking)}
                            disabled={actionLoading}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm hover:bg-red-50 transition disabled:opacity-50 cursor-pointer"
                        >
                            Cancel booking
                        </button>
                    )}
                </div>
                <p className="text-xs text-tl-muted mt-4">
                    Booking #{booking.id} · Created {formatDate(booking.createdAt)}
                </p>
            </div>
        </div>
    )
}

function GridCell({ label, value }) {
    return (
        <div>
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">
                {label}
            </p>
            <p className="text-tl-ink mt-1">{value}</p>
        </div>
    )
}

export default BookingDetailPage