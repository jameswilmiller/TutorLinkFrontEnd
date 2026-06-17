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
import BookingDetailInPerson from "./BookingDetailInPerson.jsx"
import BookingDetailOnline from "./BookingDetailOnline.jsx"
import BookingDetailMessage from "./BookingDetailMessage.jsx"
import BookingDetailManageBooking from "./BookingDetailManageBooking.jsx"
import GridCell from "./GridCell"
import {formatDate} from "../../utils/format"


function BookingDetailPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { accessToken, user } = useAuth()

    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    

    const [review, setReview] = useState(null)
    const [reviewChecked, setReviewChecked] = useState(false)

    useEffect(() => {
        
        async function load() {
            try {
                setLoading(true)
                setError("")
                const data = await getBookingById(id, accessToken)
                setBooking(data)
                if (data.status === "COMPLETED" && user?.id === data.studentUserId) {
                    try {
                        const { exists } = await bookingHasReview(data.id)
                        if (exists) {
                            const mine = await getMyReviews(accessToken)
                            setReview(mine.find(r => r.bookingId === data.id) || null)
                        }
                    } catch {
                       
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



    if (loading) return <p className="py-10 text-center">Loading booking...</p>
    if (error && !booking) return <p className="py-10 text-center text-red-500">{error}</p>
    if (!booking) return null
    
    const isTutor = user?.id === booking.tutorUserId
    const isStudent = user?.id === booking.studentUserId

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
            onSaved={setBooking}/> }
            
            
            {isOnline 
            ? <BookingDetailOnline booking={booking} isTutor={isTutor} canEdit={canEdit} onSaved={setBooking}/> 
            : <BookingDetailInPerson booking={booking} isTutor={isTutor} canEdit={canEdit} onSaved={setBooking}/>}
            
            {booking.message && <BookingDetailMessage booking={booking}/>}

            
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

            <BookingDetailManageBooking booking={booking} onSaved={setBooking}/>
        </div>
    )
}

export default BookingDetailPage