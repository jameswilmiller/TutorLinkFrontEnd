import StarRating from "./StarRating"

/**
 * Displays a single submitted review (used on the booking detail page
 * after the student has reviewed, and in the tutor profile review list).
 */
function ReviewSummary({ review, showStudent = false }) {
    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
                <StarRating value={review.rating} />
                <span className="text-xs text-tl-muted">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                        day: "numeric", month: "short", year: "numeric",
                    })}
                </span>
            </div>
            {showStudent && (
                <p className="text-sm font-medium text-tl-ink mb-1">
                    {review.studentName}
                    <span className="text-tl-muted font-normal"> · {review.courseCode}</span>
                </p>
            )}
            {review.comment && (
                <p className="text-sm text-tl-ink whitespace-pre-wrap">{review.comment}</p>
            )}
        </div>
    )
}

export default ReviewSummary