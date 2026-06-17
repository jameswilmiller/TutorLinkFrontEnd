import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { getOtherParty } from "../../utils/booking"
import { acceptBooking, declineBooking } from "../../services/bookingService"

function BookingDetailActionPanel({booking, isTutor, onSaved}) {
    const {accessToken} = useAuth();
    const [actionLoading, setActionLoading] = useState(false)
    const [actionError, setActionError] = useState("")
    const other = getOtherParty(booking, isTutor)
    
    async function runAction(actionFn) {
        setActionLoading(true)
        setActionError("")
        try {
            const updated = await actionFn(booking.id, accessToken)
            onSaved(updated)
        } catch (err) {
            setActionError(err.message || "Action failed")
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <p className="font-semibold text-tl-ink">Respond to this request</p>
                <p className="text-sm text-tl-muted mt-1">
                    {other.firstName} is waiting to hear back.
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
    )
}
export default BookingDetailActionPanel