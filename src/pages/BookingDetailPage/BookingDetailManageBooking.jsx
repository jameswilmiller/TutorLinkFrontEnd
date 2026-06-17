import { getOtherParty } from "../../utils/booking"
import { formatDate } from "../../utils/format"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { cancelBooking, completeBooking } from "../../services/bookingService"
function BookingDetailManageBooking({booking, onSaved}) {
    const { accessToken, user } = useAuth()
    const [actionLoading, setActionLoading] = useState(false)
    const [manageError, setManageError] = useState("")

    const isTutor = user?.id === booking.tutorUserId
    const isStudent = user?.id === booking.studentUserId
    const canTutorCancel = isTutor && booking.status === "ACCEPTED"
    const canAcceptDecline = isTutor && booking.status === "PENDING"
    const canComplete = isTutor && booking.status === "ACCEPTED"
    const canCancel = isStudent && (booking.status === "PENDING" || booking.status === "ACCEPTED")
    const other = getOtherParty(booking, isTutor)

    async function runAction(actionFn) {
        setActionLoading(true)
        setManageError("")
        try {
            const updated = await actionFn(booking.id, accessToken)
            onSaved(updated)
        } catch (err) {
            setManageError(err.message || "Action failed")
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Manage booking
            </p>
            <div className="flex flex-wrap gap-3">
                <a
                    href={`mailto:${other.email}`}
                    className="inline-block px-4 py-2 border border-tl-border rounded-xl text-sm text-tl-ink hover:bg-tl-bg transition"
                >
                    Message {other.firstName}
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
    )
}
export default BookingDetailManageBooking