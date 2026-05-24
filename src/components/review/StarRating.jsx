/**
 * Read-only star display. `value` can be fractional (e.g. 4.3) — renders
 * filled, half, and empty stars accordingly.
 */
function StarRating({ value, size = "text-base" }) {
    const rating = value || 0;

    return (
        <span className={`inline-flex ${size}`} aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map(star => {
                const filled = rating >= star;
                const half = !filled && rating >= star - 0.5;
                return (
                    <span key={star} className="text-amber-400">
                        {filled ? "★" : half ? "⯨" : <span className="text-tl-border">★</span>}
                    </span>
                );
            })}
        </span>
    );
}

export default StarRating