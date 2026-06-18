import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getStudentBookings, cancelBooking } from "../../services/bookingService"
import BookingCard from "../../components/booking/BookingCard"
import MyBookingsPageHeader from "./MyBookingsPageHeader"
import { isTutor } from "../../utils/booking"

const TABS = [
    { id: "upcoming", label: "Upcoming", filter: null },
    { id: "past", label: "Past sessions", filter: null },
    { id: "cancelled", label: "Cancelled", filter: null },
]

function MyBookingsPage() {

    const { accessToken, user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actioningId, setActioningId] = useState(null)
    const [activeTab, setActiveTab] = useState("upcoming")
    const [currentRole, setCurrentRole] = useState("STUDENT")
    const userIsTutor = isTutor(user)
    
    

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
        <div>
        <MyBookingsPageHeader isTutor={userIsTutor} currentRole={currentRole} onRoleChange={setCurrentRole}/>

            <div className="max-w-350 mx-auto px-6 py-12">
                

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
        </div>
        
    )
}

export default MyBookingsPage