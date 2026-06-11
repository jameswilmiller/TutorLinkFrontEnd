import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import {
    getBookingById,
    acceptBooking,
    declineBooking,
    cancelBooking,
    completeBooking,
    updateMeetingLink,
    updateMeetingLocation,
} from "../../services/bookingService"
import { bookingHasReview, getMyReviews } from "../../services/reviewsService"
import BookingStatusBadge from "../../components/booking/BookingStatusBadge"
import PlacesAutoComplete from "../../components/search/PlacesAutoComplete"
import ReviewForm from "../../components/review/ReviewForm"
import ReviewSummary from "../../components/review/ReviewSummary"
import BookingDetailHeader from "./BookingDetailHeader"
import BookingDetailActionPanel from "./BookingDetailActionPanel.jsx"
import GridCell from "./GridCell"
import {formatDate} from "../../utils/format"

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

                if (data.status === "COMPLETED" && user?.id === data.studentUserId) {
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
    
    const isTutor = user?.id === booking.tutorUserId
    const isStudent = user?.id === booking.studentUserId

    const otherName = isTutor ? booking.studentName : booking.tutorName
    const otherEmail = isTutor ? booking.studentEmail : booking.tutorEmail
    const otherFirst = otherName ? otherName.split(" ")[0] : ""

    const canAcceptDecline = isTutor && booking.status === "PENDING"
    const canComplete = isTutor && booking.status === "ACCEPTED"
    const canCancel = isStudent && (booking.status === "PENDING" || booking.status === "ACCEPTED")
    const canTutorCancel = isTutor && booking.status === "ACCEPTED"
    const canEdit = isTutor && booking.status === "ACCEPTED"

    const isOnline = booking.sessionType === "ONLINE"

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-tl-muted hover:text-tl-ink transition cursor-pointer"
            >
                Back to bookings
            </button>

            <BookingDetailHeader booking={booking} isTutor={isTutor}/>
            
            { error && <p className="text-red-500 mt-4">{error}</p>}

            { canAcceptDecline && <BookingDetailActionPanel 
            booking={booking} 
            isTutor={isTutor} 
            actionLoading={actionLoading} 
            onAccept={acceptBooking} 
            onDecline={declineBooking}/>
            }
            
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

export default BookingDetailPage