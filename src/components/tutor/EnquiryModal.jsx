import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { sendEnquiry } from "../../services/tutorService"

function EnquiryModal({ tutor, onClose }) {
    const { accessToken, user } = useAuth()

    const [step, setStep] = useState(1)
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        course: "",
        sessionType: "online",
        message: "",
    })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    useEffect(() => {
        function handleEscape(e) {
            if (e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [onClose])

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

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-tl-border">
                    <h2 id="enquiry-title" className="font-display text-2xl text-tl-ink">
                        Book a lesson
                    </h2>
                    <button onClick={onClose} className="text-tl-muted hover:text-tl-ink text-xl cursor-pointer" aria-label="Close">
                        ✕
                    </button>
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
                            className="mt-4 px-6 py-3 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover transition text-sm cursor-pointer"
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
                            <label className="text-sm text-tl-muted mb-1 block" htmlFor="enquiry-course">
                                Which course do you need help with?
                            </label>
                            <input
                                id="enquiry-course"
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
                                {["online", "in-person"].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => update({ sessionType: type })}
                                        className={`flex-1 py-3 rounded-xl text-sm font-medium border transition capitalize cursor-pointer ${
                                            formData.sessionType === type
                                                ? "bg-tl-accent text-white border-tl-accent"
                                                : "border-tl-border text-tl-ink hover:bg-tl-bg"
                                        }`}
                                    >
                                        {type === "in-person" ? "In person" : "Online"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-tl-muted mb-1 block" htmlFor="enquiry-message">
                                Message (optional)
                            </label>
                            <textarea
                                id="enquiry-message"
                                value={formData.message}
                                onChange={e => update({ message: e.target.value })}
                                placeholder="e.g. I'm struggling with recursion and have an assignment due next week..."
                                rows={3}
                                className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
                            />
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!formData.course.trim()}
                            className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                                <ReviewRow label="Tutor" value={`${tutor.firstname} ${tutor.lastname}`} />
                                <ReviewRow label="From" value={`${user?.firstname} ${user?.lastname}`} />
                                <ReviewRow label="Course" value={formData.course} />
                                <ReviewRow label="Type" value={formData.sessionType} capitalize />
                                <ReviewRow label="Rate" value={`$${tutor.hourlyRate}/hr`} />
                                {formData.message && (
                                    <ReviewRow label="Message" value={formData.message} />
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-tl-muted">
                            {tutor.firstname} will reply to your email to confirm the booking. Payment is handled directly with your tutor.
                        </p>

                        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm cursor-pointer"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={sending}
                                className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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

function ReviewRow({ label, value, capitalize = false }) {
    return (
        <div className="flex justify-between text-sm gap-4">
            <span className="text-tl-muted">{label}</span>
            <span className={`text-tl-ink text-right max-w-[60%] ${capitalize ? "capitalize" : ""}`}>
                {value}
            </span>
        </div>
    )
}

export default EnquiryModal