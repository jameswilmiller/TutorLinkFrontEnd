import BookingStatusBadge from "../../components/booking/BookingStatusBadge"
import {formatTime, formatDate, initials} from "../../utils/format"
import GridCell from "./GridCell"
import {getOtherParty} from "../../utils/booking"

const SESSION_TYPE_LABELS = {
    ONLINE: "Online",
    IN_PERSON: "In Person"
}
    
function BookingDetailHeader ({booking, isTutor}) {
    
    const hours = (booking.durationMinutes || 0) / 60
    const earnings = booking.tutorHourlyRate != null ? booking.tutorHourlyRate * hours : null
    const other = getOtherParty(booking, isTutor)
   
    return (
            <div className="bg-white border border-tl-border rounded-2xl p-6 mt-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-tl-accent text-white flex items-center justify-center font-semibold text-lg shrink-0">
                            {initials(other.name)}
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">
                                Booking {isTutor ? "from" : "with"}
                            </p>
                            <h1 className="font-display text-3xl text-tl-ink leading-tight">
                                {other.name}
                            </h1>
                            <p className="text-sm text-tl-muted">{other.email}</p>
                        </div>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                </div>
               
                <div className="bg-tl-bg rounded-xl p-5 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                    <GridCell label="Course" value={booking.courseCode} />
                    <GridCell label="Date" value={formatDate(booking.scheduledAt)} />
                    <GridCell label="Time" value={`${formatTime(booking.scheduledAt)} · ${booking.durationMinutes} min`} />
                    <GridCell label="Mode" value={SESSION_TYPE_LABELS[booking.sessionType] || booking.sessionType} />
                    <GridCell label="Requested" value={formatDate(booking.createdAt)} />
                    {isTutor && earnings != null && (
                        <GridCell
                            label="You'll earn"
                            value={`$${earnings % 1 === 0 ? earnings : earnings.toFixed(2)}`}
                        />
                    )}
                </div>
            </div>)
}
export default BookingDetailHeader;
