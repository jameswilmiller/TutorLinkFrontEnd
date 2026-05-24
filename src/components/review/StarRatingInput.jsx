import { useState } from "react"

/**
 * Interactive 1-5 star picker. Calls onChange(rating) when a star is
 * clicked. Hovering previews the rating.
 */
function StarRatingInput({ value, onChange }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="inline-flex gap-1">
            {[1, 2, 3, 4, 5].map(star => {
                const active = (hover || value) >= star;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`text-3xl transition cursor-pointer ${
                            active ? "text-amber-400" : "text-tl-border"
                        }`}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
}

export default StarRatingInput