import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
    getTutorBookings,
    acceptBooking,
    declineBooking,
    cancelBooking,
    completeBooking,
} from "../../services/bookingService"
import BookingCard from "../booking/BookingCard"

function DashboardBookings() {
    const { accessToken } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actioningId, setActioningId] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                setError("")
                const data = await getTutorBookings(accessToken)
                setBookings(data)
            } catch (err) {
                setError(err.message || "Failed to load booking requests")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [accessToken])

    async function runAction(bookingId, actionFn) {
        setActioningId(bookingId)
        setError("")
        try {
            const updated = await actionFn(bookingId, accessToken)
            setBookings(prev => prev.map(b => b.id === bookingId ? updated : b))
        } catch (err) {
            setError(err.message || "Action failed")
        } finally {
            setActioningId(null)
        }
    }

    function actionsFor(booking) {
        const busy = actioningId === booking.id

        if (booking.status === "PENDING") {
            return (
                <>
                    <button
                        onClick={() => runAction(booking.id, acceptBooking)}
                        disabled={busy}
                        className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => runAction(booking.id, declineBooking)}
                        disabled={busy}
                        className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                    >
                        Decline
                    </button>
                </>
            )
        }

        if (booking.status === "ACCEPTED") {
            return (
                <>
                    <button
                        onClick={() => runAction(booking.id, completeBooking)}
                        disabled={busy}
                        className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                    >
                        Mark complete
                    </button>
                    <button
                        onClick={() => runAction(booking.id, cancelBooking)}
                        disabled={busy}
                        className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                </>
            )
        }

        return null  // terminal states get no actions
    }

    return (
        <div className="max-w-3xl mx-auto">
            {loading && <p className="text-tl-muted">Loading booking requests...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!loading && bookings.length === 0 && (
                <div className="bg-white border border-tl-border rounded-2xl p-8 text-center">
                    <p className="text-tl-muted">No booking requests yet.</p>
                </div>
            )}

            {!loading && bookings.length > 0 && (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            personLabel="from"
                            personName={booking.studentName}
                            actions={actionsFor(booking)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DashboardBookings