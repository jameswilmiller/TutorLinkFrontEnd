import { Link } from "react-router-dom"

function HomeCTA() {
    return (
        <section className="max-w-350 mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
                <div className="bg-tl-accent rounded-2xl p-10">
                    <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">
                        For Students
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl text-white">
                        Need help with a course?
                    </h2>
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
                    <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                        For Tutors
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl text-tl-ink">
                        Want to help others?
                    </h2>
                    <p className="text-tl-muted mt-3 leading-relaxed">
                        If you've aced a course and want to share what you know, create a profile and start earning.
                    </p>
                    <Link
                        to="/become-a-tutor"
                        className="inline-block mt-6 bg-tl-accent text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition"
                    >
                        Create a listing →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeCTA