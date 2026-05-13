import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import EnquiryModal from "./EnquiryModal"

function TutorBookingCard({ tutor }) {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)

    function handleOpen() {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location.pathname } })
            return
        }
        setShowModal(true)
    }

    return (
        <>
            <div className="bg-white border border-tl-border rounded-2xl p-6 sticky top-6">
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-4xl text-tl-ink">${tutor.hourlyRate}</span>
                    <span className="text-tl-muted text-sm">/ hour</span>
                </div>

                <button
                    onClick={handleOpen}
                    className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium cursor-pointer"
                >
                    Book a session
                </button>

                <button
                    onClick={handleOpen}
                    className="w-full mt-3 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm cursor-pointer"
                >
                    Message first
                </button>

                <p className="text-xs text-tl-muted text-center mt-4 pt-4 border-t border-tl-border">
                    {tutor.remote && tutor.location
                        ? "Online & in-person sessions available"
                        : tutor.remote
                        ? "Online sessions available"
                        : "In-person sessions only"}
                </p>
            </div>

            {showModal && (
                <EnquiryModal tutor={tutor} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default TutorBookingCard