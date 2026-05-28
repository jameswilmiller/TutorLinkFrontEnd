import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { createReview } from "../../services/reviewsService"
import StarRatingInput from "./StarRatingInput"

function ReviewForm({ bookingId, onReviewed }) {
    const { accessToken } = useAuth()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit() {
        if (rating === 0) {
            setError("Please select a rating")
            return
        }
        setSubmitting(true)
        setError("")
        try {
            const review = await createReview(
                { bookingId, rating, comment: comment || null },
                accessToken
            )
            onReviewed(review)
        } catch (err) {
            setError(err.message || "Failed to submit review")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                Leave a review
            </p>

            <div className="mb-4">
                <p className="text-sm text-tl-muted mb-2">How was your session?</p>
                <StarRatingInput value={rating} onChange={setRating} />
            </div>

            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share what went well (optional)..."
                rows={3}
                maxLength={1000}
                className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none mb-2"
            />

            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-5 py-3 bg-tl-accent text-white rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
            >
                {submitting ? "Submitting..." : "Submit review"}
            </button>
        </div>
    )
}

export default ReviewForm