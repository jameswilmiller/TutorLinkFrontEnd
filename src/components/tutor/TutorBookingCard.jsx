import { useState } from "react"
import EnquiryModal from "./EnquiryModal"

function TutorBookingCard({ tutor }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="border border-tl-border rounded-2xl p-6 bg-white">
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-4xl text-tl-ink">${tutor.hourlyRate}</span>
                    <span className="text-tl-muted text-sm">/ hour</span>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-4 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium"
                >
                    Book a lesson
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-3 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm"
                >
                    Message first
                </button>

                <p className="text-xs text-tl-muted text-center mt-4">
                    {tutor.remote ? "Online sessions available" : "In-person sessions"}
                </p>
            </div>

            {showModal && (
                <EnquiryModal tutor={tutor} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default TutorBookingCard