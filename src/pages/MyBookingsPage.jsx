import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { getStudentBookings, cancelBooking } from "../services/bookingService"
import BookingCard from "../components/booking/BookingCard"

function MyBookingsPage() {
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
                const data = await getStudentBookings(accessToken)
                setBookings(data)
            } catch (err) {
                setError(err.message || "Failed to load bookings")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [accessToken])

    async function handleCancel(bookingId) {
        setActioningId(bookingId)
        try {
            const updated = await cancelBooking(bookingId, accessToken)
            setBookings(prev => prev.map(b => b.id === bookingId ? updated : b))
        } catch (err) {
            setError(err.message || "Failed to cancel booking")
        } finally {
            setActioningId(null)
        }
    }

    function canCancel(status) {
        return status === "PENDING" || status === "ACCEPTED"
    }

    return (
        <div className="max-w-350 mx-auto px-6 py-12">
            <h1 className="font-display text-4xl text-tl-ink mb-2">My bookings</h1>
            <p className="text-tl-muted mb-8">Sessions you've requested with tutors.</p>

            {loading && <p className="text-tl-muted">Loading bookings...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && bookings.length === 0 && (
                <div className="bg-white border border-tl-border rounded-2xl p-8 text-center">
                    <p className="text-tl-muted">
                        You haven't booked any sessions yet. Find a tutor to get started.
                    </p>
                </div>
            )}

            {!loading && !error && bookings.length > 0 && (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            personLabel="with"
                            personName={booking.tutorName}
                            actions={
                                canCancel(booking.status) && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        disabled={actioningId === booking.id}
                                        className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg transition disabled:opacity-50 cursor-pointer"
                                    >
                                        {actioningId === booking.id ? "Cancelling..." : "Cancel booking"}
                                    </button>
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookingsPage