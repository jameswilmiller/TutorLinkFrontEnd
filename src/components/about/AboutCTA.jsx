import { Link } from "react-router-dom"

function AboutCTA() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-tl-accent rounded-2xl p-10">
                <h2 className="font-display text-3xl text-white">Need help with a course?</h2>
                <p className="text-white/70 mt-3 leading-relaxed">
                    Browse tutors by course code and find someone who's already been where you are.
                </p>
                <Link
                    to="/browse"
                    className="inline-block mt-6 bg-white text-tl-accent px-6 py-3 rounded-xl text-sm font-medium hover:bg-tl-bg transition"
                >
                    Find a tutor
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-tl-border p-10">
                <h2 className="font-display text-3xl text-tl-ink">Want to help others?</h2>
                <p className="text-tl-muted mt-3 leading-relaxed">
                    If you've done the course and want to share what you know, create a tutor profile and start earning.
                </p>
                <Link
                    to="/become-a-tutor"
                    className="inline-block mt-6 bg-tl-accent text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition"
                >
                    Become a tutor
                </Link>
            </div>
        </div>
    )
}

export default AboutCTA