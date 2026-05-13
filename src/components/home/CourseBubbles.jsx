import { Link } from "react-router-dom"

const COURSES = ["MATH1051", "CSSE1001", "ECON1010", "PHYS1001", "LAWS1100", "BIOL1020", "CHEM1100", "COMP2048"]

function CourseBubbles() {
    return (
        <ul className="flex flex-wrap justify-center mt-6 gap-3">
            {COURSES.map(course => (
                <li key={course}>
                    <Link
                        to={`/browse?courseCode=${course}`}
                        className="inline-block border border-tl-border rounded-full bg-tl-surface px-3 py-1.5
                                   text-tl-muted hover:border-tl-accent hover:text-tl-ink text-xs transition"
                    >
                        {course}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default CourseBubbles