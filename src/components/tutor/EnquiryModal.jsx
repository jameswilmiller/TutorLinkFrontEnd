import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { sendEnquiry } from "../../services/tutorService"

function EnquiryModal({ tutor, onClose }) {
    const { isAuthenticated, accessToken, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate, location.pathname])

    const [step, setStep] = useState(1)
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        course: "",
        sessionType: "online",
        message: "",
    })

    function update(fields) {
        setFormData(prev => ({ ...prev, ...fields }))
    }

    async function handleSend() {
        setSending(true)
        setError("")
        try {
            await sendEnquiry(tutor.id, formData, accessToken)
            setSent(true)
        } catch (err) {
            setError(err.message || "Failed to send enquiry")
        } finally {
            setSending(false)
        }
    }

    if (!isAuthenticated) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-tl-border">
                    <h2 className="font-display text-2xl text-tl-ink">Book a lesson</h2>
                    <button onClick={onClose} className="text-tl-muted hover:text-tl-ink text-xl">✕</button>
                </div>

                {sent ? (
                    <div className="p-8 text-center space-y-4">
                        <p className="text-4xl">✓</p>
                        <h3 className="font-display text-2xl text-tl-ink">Request sent!</h3>
                        <p className="text-tl-muted text-sm">
                            {tutor.firstname} will receive your enquiry by email and get back to you directly.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-6 py-3 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover transition text-sm"
                        >
                            Done
                        </button>
                    </div>
                ) : step === 1 ? (
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between bg-tl-bg rounded-xl p-4">
                            <div>
                                <p className="font-semibold text-tl-ink">{tutor.firstname} {tutor.lastname}</p>
                                <p className="text-sm text-tl-muted">
                                    {tutor.courses?.slice(0, 2).map(c => c.courseCode).join(", ")}
                                </p>
                            </div>
                            <p className="font-display text-2xl text-tl-ink">${tutor.hourlyRate}/hr</p>
                        </div>

                        <div className="bg-tl-bg rounded-xl p-4 text-sm">
                            <p className="text-tl-muted">Booking as</p>
                            <p className="text-tl-ink font-medium">{user?.firstname} {user?.lastname}</p>
                            <p className="text-tl-muted text-xs">{user?.email}</p>
                        </div>

                        <div>
                            <label className="text-sm text-tl-muted mb-1 block">Which course do you need help with?</label>
                            <input
                                type="text"
                                value={formData.course}
                                onChange={e => update({ course: e.target.value })}
                                placeholder="e.g. MATH1051"
                                className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-tl-muted mb-2 block">Session type</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => update({ sessionType: "online" })}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition ${
                                        formData.sessionType === "online"
                                            ? "bg-tl-accent text-white border-tl-accent"
                                            : "border-tl-border text-tl-ink hover:bg-tl-bg"
                                    }`}
                                >
                                    Online
                                </button>
                                <button
                                    type="button"
                                    onClick={() => update({ sessionType: "in-person" })}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition ${
                                        formData.sessionType === "in-person"
                                            ? "bg-tl-accent text-white border-tl-accent"
                                            : "border-tl-border text-tl-ink hover:bg-tl-bg"
                                    }`}
                                >
                                    In person
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-tl-muted mb-1 block">Message (optional)</label>
                            <textarea
                                value={formData.message}
                                onChange={e => update({ message: e.target.value })}
                                placeholder="e.g. I'm struggling with recursion and have an assignment due next week..."
                                rows={3}
                                className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
                            />
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!formData.course}
                            className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-50"
                        >
                            Review booking →
                        </button>
                    </div>
                ) : (
                    <div className="p-6 space-y-4">
                        <div className="bg-tl-bg rounded-xl p-4">
                            <h3 className="font-display text-2xl text-tl-ink mb-4">Confirm your booking</h3>
                            <p className="text-sm text-tl-muted mb-4">
                                Review your details. Once confirmed, a booking request will be sent to {tutor.firstname} via email.
                            </p>
                            <div className="space-y-3 border-t border-tl-border pt-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-tl-muted">Tutor</span>
                                    <span className="text-tl-ink">{tutor.firstname} {tutor.lastname}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-tl-muted">From</span>
                                    <span className="text-tl-ink">{user?.firstname} {user?.lastname}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-tl-muted">Course</span>
                                    <span className="text-tl-ink">{formData.course}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-tl-muted">Type</span>
                                    <span className="text-tl-ink capitalize">{formData.sessionType}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-tl-muted">Rate</span>
                                    <span className="text-tl-ink">${tutor.hourlyRate}/hr</span>
                                </div>
                                {formData.message && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-tl-muted">Message</span>
                                        <span className="text-tl-ink text-right max-w-[60%]">{formData.message}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-tl-muted">
                            {tutor.firstname} will reply to your email to confirm the booking. Payment is handled directly with your tutor.
                        </p>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={sending}
                                className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-70"
                            >
                                {sending ? "Sending..." : "Send booking request →"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnquiryModal