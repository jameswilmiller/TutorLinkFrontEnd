const STATUS_CONFIG = {
    PENDING:   { label: "Pending",   className: "bg-amber-100 text-amber-800" },
    ACCEPTED:  { label: "Accepted",  className: "bg-green-100 text-green-800" },
    DECLINED:  { label: "Declined",  className: "bg-red-100 text-red-700" },
    CANCELLED: { label: "Cancelled", className: "bg-gray-200 text-gray-600" },
    COMPLETED: { label: "Completed", className: "bg-blue-100 text-blue-800" },
}

function BookingStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || {
        label: status,
        className: "bg-gray-100 text-gray-700",
    }

    return (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    )
}

export default BookingStatusBadge