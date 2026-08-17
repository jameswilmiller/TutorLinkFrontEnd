import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getStudentBookings, cancelBooking } from "../../services/bookingService"
import BookingCard from "../../components/booking/BookingCard"
import BookingTabs from "../../components/booking/BookingTabs"
import { useBookings } from "../../hooks/useBookings"
import { filterByTab } from "../../utils/booking"

const TABS = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past sessions" },
    { id: "cancelled", label: "Cancelled" },
]
 
function StudentBookings() {
    const { bookings, loading, error, actioningId, runAction } =
        useBookings(getStudentBookings)
    const [activeTab, setActiveTab] = useState("upcoming")
 
    const visibleBookings = filterByTab(bookings, activeTab)
 
    if (loading) {
        return <p className="text-tl-muted">Loading bookings...</p>
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
                            personLabel="with"
                            personName={booking.tutorName}
                            actions={
                                activeTab === "upcoming" && (
                                    <button
                                        onClick={() => runAction(booking.id, cancelBooking)}
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
        </>
    )
}
 
export default StudentBookings

