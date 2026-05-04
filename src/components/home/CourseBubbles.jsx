function CourseBubbles() {
    const courses = ["Math1051", "CSSE1001", "ECON1010", "PHYS1001", "LAWS1100"]
    return(
        <ul className="flex flex-row justify-center mt-6 gap-8">
            {courses.map(course => (
                <li className="border-tl-border rounded-full px-1.5 py-1.5 border cursor-pointer
                text-body text-tl-muted hover:bg-tl-subtle">
                    {course}
                </li>

            ))}
        </ul>
    )
}
export default CourseBubbles