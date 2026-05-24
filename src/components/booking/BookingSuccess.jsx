function BookingSuccess({ tutor, onClose }) {
    return (
        <div className="p-8 text-center space-y-4">
            <p className="text-4xl">✓</p>
            <h3 className="font-display text-2xl text-tl-ink">Booking requested!</h3>
            <p className="text-tl-muted text-sm">
                {tutor.firstname} will be notified and can accept or decline your request.
                You can track it in your bookings.
            </p>
            <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover transition text-sm cursor-pointer"
            >
                Done
            </button>
        </div>
    )
}

export default BookingSuccess