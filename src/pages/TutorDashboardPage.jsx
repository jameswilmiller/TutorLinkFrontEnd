import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getMyTutorProfile } from "../services/tutorService"
import DashboardOverview from "../components/tutor-edit/DashboardOverview"
import DashboardEdit from "../components/tutor-edit/DashboardEdit"
import DashboardComingSoon from "../components/tutor-edit/DashboardComingSoon"
import DashboardBookings from "../components/tutor-edit/DashboardBookings"

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "edit", label: "Edit Profile" },
    { id: "bookings", label: "Booking Requests" },
    { id: "availability", label: "Availability", disabled: true },
]

function TutorDashboardPage() {
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        if (!accessToken) return
        async function load() {
            try {
                const data = await getMyTutorProfile(accessToken)
                setTutor(data)
            } catch {
                navigate("/become-a-tutor")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [accessToken, navigate])

    if (loading) return <p className="py-10 text-center">Loading...</p>
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

             
                    <div className="flex gap-8">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                                disabled={tab.disabled}
                                className={`pb-3 cursor-pointer text-sm font-medium transition border-b-2 -mb-px ${
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