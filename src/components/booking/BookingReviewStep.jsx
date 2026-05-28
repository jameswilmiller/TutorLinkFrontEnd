import ReviewRow from "./ReviewRow"

const DURATION_LABELS = {
    30: "30 minutes",
    60: "1 hour",
    90: "1.5 hours",
    120: "2 hours",
}

const SESSION_TYPE_LABELS = {
    ONLINE: "Online",
    IN_PERSON: "In person",
}

function formatDateTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "2-digit",
    });
}

function BookingReviewStep({ tutor, user, formData, error, submitting, onBack, onSubmit }) {
    const course = tutor.courses?.find(c => String(c.id) === String(formData.courseId));

    return (
        <div className="p-6 space-y-4">
            <div className="bg-tl-bg rounded-xl p-4">
                <h3 className="font-display text-2xl text-tl-ink mb-4">Confirm your booking</h3>
                <p className="text-sm text-tl-muted mb-4">
                    Review your details. Once confirmed, a booking request will be sent to {tutor.firstname}.
                </p>
                <div className="space-y-3 border-t border-tl-border pt-3">
                    <ReviewRow label="Tutor" value={`${tutor.firstname} ${tutor.lastname}`} />
                    <ReviewRow label="From" value={`${user?.firstname} ${user?.lastname}`} />
                    <ReviewRow label="Course" value={course ? course.courseCode : "—"} />
                    <ReviewRow label="When" value={formatDateTime(formData.scheduledAt)} />
                    <ReviewRow label="Duration" value={DURATION_LABELS[formData.durationMinutes]} />
                    <ReviewRow label="Type" value={SESSION_TYPE_LABELS[formData.sessionType]} />
                    {formData.sessionType === "IN_PERSON" && formData.meetingLocation && (
                    <ReviewRow label="Location" value={formData.meetingLocation} />
                    )}
                    <ReviewRow label="Rate" value={`$${tutor.hourlyRate}/hr`} />
                    {formData.message && (
                        <ReviewRow label="Message" value={formData.message} />
                    )}
                </div>
            </div>

            <p className="text-xs text-tl-muted">
                {tutor.firstname} will be notified and can accept or decline. Payment is handled directly with your tutor.
            </p>

            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition text-sm cursor-pointer"
                >
                    ← Back
                </button>
                <button
                    onClick={onSubmit}
                    disabled={submitting}
                    className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition font-medium disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                    {submitting ? "Sending..." : "Confirm booking →"}
                </button>
            </div>
        </div>
    )
}

export default BookingReviewStep