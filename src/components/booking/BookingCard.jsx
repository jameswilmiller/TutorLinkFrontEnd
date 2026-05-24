import { Link } from "react-router-dom"
import BookingStatusBadge from "./BookingStatusBadge"

const SESSION_TYPE_LABELS = {
    ONLINE: "Online",
    IN_PERSON: "In person",
}

function formatDateTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

function BookingCard({ booking, personLabel, personName, actions }) {
    return (
        <div className="bg-white border border-tl-border rounded-2xl p-5 hover:border-tl-accent transition">
            <Link to={`/bookings/${booking.id}`} className="block">
                <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-tl-ink">{booking.courseCode}</p>
                    <BookingStatusBadge status={booking.status} />
                </div>
                <p className="text-sm text-tl-muted">
                    {personLabel} {personName}
                </p>
                <p className="text-sm text-tl-muted mt-2">
                    {formatDateTime(booking.scheduledAt)}
                    {" · "}
                    {booking.durationMinutes} min
                    {" · "}
                    {SESSION_TYPE_LABELS[booking.sessionType] || booking.sessionType}
                </p>
                {booking.message && (
                    <p className="text-sm text-tl-ink mt-2 bg-tl-bg rounded-lg p-3">
                        {booking.message}
                    </p>
                )}
            </Link>

            {actions && (
                <div
                    className="flex gap-2 mt-4 pt-4 border-t border-tl-border"
                    onClick={e => e.stopPropagation()}
                >
                    {actions}
                </div>
            )}
        </div>
    )
}

export default BookingCard