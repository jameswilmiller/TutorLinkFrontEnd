import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getMyTutorProfile } from "../services/tutorService"
import DashboardOverview from "../components/tutor-edit/DashboardOverview"
import DashboardEdit from "../components/tutor-edit/DashboardEdit"
import DashboardComingSoon from "../components/tutor-edit/DashboardComingSoon"
import DashboardBookings from "../components/tutor-edit/DashboardBookings"
import LoadingState from "../components/ui/LoadingState"
import ErrorState from "../components/ui/ErrorState"

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "edit", label: "Edit Profile" },
    { id: "bookings", label: "Booking Requests" },
    { id: "availability", label: "Availability", disabled: true },
]

function TutorDashboardPage() {
    const { accessToken, authedRequest } = useAuth()
    const navigate = useNavigate()
    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState("overview")

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await authedRequest(token => getMyTutorProfile(token))
            setTutor(data)
        } catch (err) {
            if (err.status === 404) {
                navigate("/become-a-tutor")
                return
            }
            // A 401 here means the retry against a fresh token also failed, so
            // the session is gone and ProtectedRoute will redirect to login.
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [authedRequest, navigate])

    useEffect(() => {
        if (!accessToken) return
        load()
    }, [accessToken, load])

    if (loading) return <LoadingState message="Loading your listing..." />
    if (error) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-10">
                <ErrorState
                    title="Couldn't load your listing"
                    message={error.message || "Please try again."}
                    onRetry={load}
                />
            </div>
        )
    }
    if (!tutor) return null

    return (
        <div>
       
            <div className="bg-tl-surface border-b border-tl-border">
                <div className="max-w-350 mx-auto px-6 py-10">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="font-display text-4xl text-tl-ink">Your listing</h1>
                            <p className="text-tl-muted mt-2">Manage how students find and book you</p>
                        </div>
                        <button
                            onClick={() => navigate(`/tutors/${tutor.slug}`)}
                            className="border border-tl-border bg-white text-tl-ink px-4 py-2 rounded-xl text-sm hover:bg-tl-bg transition cursor-pointer hover:border-tl-accent"
                        >
                            View public profile
                        </button>
                    </div>

             
                    <div className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                                disabled={tab.disabled}
                                className={`pb-3 cursor-pointer text-sm font-medium transition border-b-2 mb-px shrink-0 ${
                                    activeTab === tab.id
                                        ? "border-tl-ink text-tl-ink"
                                        : tab.disabled
                                        ? "border-transparent text-tl-muted/50 cursor-not-allowed"
                                        : "border-transparent text-tl-muted hover:text-tl-ink"
                                }`}
                                title={tab.disabled ? "Coming soon" : ""}
                            >
                                {tab.label}
                                {tab.disabled && (
                                    <span className="ml-2 text-xs text-tl-muted/60">(soon)</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-6 py-10">
                {activeTab === "overview" && <DashboardOverview tutor={tutor} />}
                {activeTab === "edit" && <DashboardEdit tutor={tutor} setTutor={setTutor} />}
                {activeTab === "bookings" && <DashboardBookings />}
                {activeTab === "availability" && <DashboardComingSoon feature="Availability" />}
            </div>
        </div>
    )
}

export default TutorDashboardPage