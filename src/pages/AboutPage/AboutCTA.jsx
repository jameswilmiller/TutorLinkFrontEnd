import { Link } from "react-router-dom"

function AboutCTA() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
                to="/browse"
                className="bg-tl-accent text-white py-4 rounded-xl text-sm font-medium text-center hover:bg-tl-accent-hover transition"
            >
                Find a tutor →
            </Link>
            <Link
                to="/become-a-tutor"
                className="bg-white border border-tl-border text-tl-ink py-4 rounded-xl text-sm font-medium text-center hover:bg-tl-bg transition"
            >
                Become a tutor →
            </Link>
        </div>
    )
}

export default AboutCTA