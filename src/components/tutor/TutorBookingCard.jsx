import { useState } from "react"
import EnquiryModal from "./EnquiryModal"

function TutorBookingCard({ tutor }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="bg-white border border-tl-border rounded-2xl p-6 sticky top-6">
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-4xl text-tl-ink">${tutor.hourlyRate}</span>
                    <span className="text-tl-muted text-sm">/ hour</span>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium"
                >
                    Book a session
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-3 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm"
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

                {tutor.credentials?.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-tl-border">
                        <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                            Credentials
                        </p>
                        <div className="space-y-2">
                            {tutor.credentials.map(cred => (
                                <div key={cred.id} className="text-sm">
                                    <p className="text-tl-ink font-medium">{cred.title}</p>
                                    <p className="text-tl-muted text-xs">
                                        {cred.institution}{cred.year ? ` · ${cred.year}` : ""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <EnquiryModal tutor={tutor} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default TutorBookingCard