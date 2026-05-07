function CourseBubbles() {
    const courses = ["MATH1051", "CSSE1001", "ECON1010", "PHYS1001", "LAWS1100", "BIOL1020", "CHEM1100", "COMP2048"]
    return(
        <ul className="flex flex-row flex-wrap justify-center mt-6 gap-8">
            {courses.map(course => (
                <li className="border-tl-border rounded-full bg-tl-surface px-1.5 py-1.5 border cursor-pointer
                 text-tl-muted hover:border-tl-accent text-caption">
                    {course}
                </li>

            ))}
        </ul>
    )
}
export default CourseBubbles