import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchTutors } from "../../services/tutorService"
import TutorCard from "../tutor/TutorCard"

function FeaturedTutors() {
    const [tutors, setTutors] = useState([])

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchTutors({ sort: "newest" })
                setTutors(data.slice(0, 4))
            } catch {
                setTutors([])
            }
        }
        load()
    }, [])

    if (tutors.length === 0) return null

    return (
        <div className="max-w-350 mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-overline font-semibold text-tl-label tracking-widest uppercase ">
                        Featured Tutors
                    </p>
                    <h2 className="font-display text-4xl text-tl-ink">Popular right now</h2>
                </div>
                <Link
                    to="/browse"
                    className="text-sm text-tl-muted hover:text-tl-ink transition"
                >
                    Browse all tutors
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {tutors.map(tutor => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedTutors