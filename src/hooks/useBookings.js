import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
 

export function useBookings(fetchBookings) {
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
                const data = await fetchBookings(accessToken)
                setBookings(data)
            } catch (err) {
                setError(err.message || "Failed to load bookings")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [accessToken, fetchBookings])
 
    // Runs an action like acceptBooking, then updates that booking in the list.
    async function runAction(bookingId, actionFn) {
        setActioningId(bookingId)
        setError("")
        try {
            const updated = await actionFn(bookingId, accessToken)
            setBookings(prev => prev.map(b => (b.id === bookingId ? updated : b)))
        } catch (err) {
            setError(err.message || "Action failed")
        } finally {
            setActioningId(null)
        }
    }
 
    return { bookings, loading, error, actioningId, runAction }
}
 