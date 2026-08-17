import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getStudentBookings, cancelBooking } from "../../services/bookingService"
import BookingCard from "../../components/booking/BookingCard"
import MyBookingsPageHeader from "./MyBookingsPageHeader"
import StudentBookings from "./StudentBookings"
import { isTutor } from "../../utils/booking"
import TutorBookings from "../../components/booking/TutorBookings"

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
            <MyBookingsPageHeader 
            isTutor={userIsTutor} 
            currentRole={currentRole} 
            onRoleChange={setCurrentRole}
            />

            <div className="max-w-350 mx-auto px-6 py-12">
                {currentRole == "STUDENT" ? <StudentBookings/> : <TutorBookings/>}
            </div>

        </div>
        
    )
}

export default MyBookingsPage