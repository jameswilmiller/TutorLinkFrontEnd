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

export default ReviewRow