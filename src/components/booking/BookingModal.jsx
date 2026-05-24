import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { createBooking } from "../../services/bookingService"
import { toFieldErrorMap } from "../../utils/formErrors"
import BookingFormStep from "./BookingFormStep"
import BookingReviewStep from "./BookingReviewStep"
import BookingSuccess from "./BookingSuccess"

const EMPTY_FORM = {
    courseId: "",
    scheduledAt: "",
    bookingDate: "",
    bookingTime: "",
    durationMinutes: 60,
    sessionType: "ONLINE",
    message: "",
    meetingLocation: "",
}

function BookingModal({ tutor, onClose }) {
    const { accessToken, user } = useAuth()

    const [step, setStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [formData, setFormData] = useState(EMPTY_FORM)

    
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

    function handleChange(fields) {
        setFormData(prev => {
        const next = { ...prev, ...fields }
        // Whenever date or time changes, rebuild the combined ISO value
        if ("bookingDate" in fields || "bookingTime" in fields) {
            next.scheduledAt =
                next.bookingDate && next.bookingTime
                    ? `${next.bookingDate}T${next.bookingTime}`
                    : ""
        }
        return next
    })
       
        const editedKeys = Object.keys(fields)
        setFieldErrors(prev => {
            const next = { ...prev }
            editedKeys.forEach(key => delete next[key])
            if ("bookingDate" in fields || "bookingTime" in fields) {
            delete next.scheduledAt
        }
            return next
        })
    }

    async function handleSubmit() {
        setSubmitting(true)
        setError("")
        setFieldErrors({})
        try {
            await createBooking(
                {
                    tutorId: tutor.id,
                    courseId: Number(formData.courseId),
                    scheduledAt: formData.scheduledAt,
                    durationMinutes: formData.durationMinutes,
                    sessionType: formData.sessionType,
                    message: formData.message || null,
                    meetingLocation:
                        formData.sessionType === "IN_PERSON"
                            ? (formData.meetingLocation || null)
                            : null,
                },
                accessToken
            )
            setSubmitted(true)
        } catch (err) {
            if (err.fieldErrors && err.fieldErrors.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))
                setStep(1) // jump back to the form so they can see the field errors
            } else {
                setError(err.message || "Failed to create booking")
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-tl-border">
                    <h2 id="booking-title" className="font-display text-2xl text-tl-ink">
                        Book a session
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-tl-muted hover:text-tl-ink text-xl cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {submitted ? (
                    <BookingSuccess tutor={tutor} onClose={onClose} />
                ) : step === 1 ? (
                    <BookingFormStep
                        tutor={tutor}
                        user={user}
                        formData={formData}
                        fieldErrors={fieldErrors}
                        onChange={handleChange}
                        onNext={() => setStep(2)}
                    />
                ) : (
                    <BookingReviewStep
                        tutor={tutor}
                        user={user}
                        formData={formData}
                        error={error}
                        submitting={submitting}
                        onBack={() => setStep(1)}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    )
}

export default BookingModal