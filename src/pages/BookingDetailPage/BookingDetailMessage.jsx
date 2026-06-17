function BookingDetailMessage({booking}) {
    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                Message from {booking.studentName}
            </p>
            <p className="text-tl-ink whitespace-pre-wrap">"{booking.message}"</p>
        </div>
    )
}
export default BookingDetailMessage
                
            