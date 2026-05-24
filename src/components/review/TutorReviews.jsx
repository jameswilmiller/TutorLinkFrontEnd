import { useState, useEffect } from "react"
import { getTutorReviews } from "../../services/reviewsService"
import StarRating from "./StarRating"
import ReviewSummary from "./ReviewSummary"

function TutorReviews({ tutorId, averageRating, reviewCount }) {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const data = await getTutorReviews(tutorId)
                setReviews(data)
            } catch {
                setReviews([])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [tutorId])

    if (loading) return null
    if (reviewCount === 0) return null

    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display text-2xl text-tl-ink">Reviews</h2>
                <StarRating value={averageRating} />
                <span className="text-sm text-tl-muted">
                    {averageRating?.toFixed(1)} · {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="space-y-4">
                {reviews.map(review => (
                    <ReviewSummary key={review.id} review={review} showStudent />
                ))}
            </div>
        </div>
    )
}

export default TutorReviews