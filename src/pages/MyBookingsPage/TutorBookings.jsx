import { useState } from "react"
import { useBookings } from "../../hooks/useBookings"
import {
    getTutorBookings,
    acceptBooking,
    declineBooking,
    cancelBooking,
    completeBooking,
} from "../../services/bookingService"
import BookingCard from "../../components/booking/BookingCard"
import BookingTabs from "./BookingTabs"
import { filterByTab } from "../../utils/booking"

 
const TABS = [
    { id: "upcoming", label: "Incoming & upcoming" },
    { id: "past", label: "Past sessions" },
    { id: "cancelled", label: "Cancelled" },
]
 
function TutorBookings() {
    const { bookings, loading, error, actioningId, runAction } =
        useBookings(getTutorBookings)
    const [activeTab, setActiveTab] = useState("upcoming")
 
    const visibleBookings = filterByTab(bookings, activeTab)
 
    
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
 
        return null 
    }
 
    if (loading) {
        return <p className="text-tl-muted">Loading booking requests...</p>
    }
 
    return (
        <>
            <BookingTabs
                tabs={TABS}
                bookings={bookings}
                activeTab={activeTab}
                onChange={setActiveTab}
            />
 
            {error && <p className="text-red-500 mb-4">{error}</p>}
 
            {visibleBookings.length === 0 ? (
                <div className="bg-white border border-tl-border rounded-2xl p-8 text-center">
                    <p className="text-tl-muted">Nothing here yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {visibleBookings.map(booking => (
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
        </>
    )
}
 
export default TutorBookings