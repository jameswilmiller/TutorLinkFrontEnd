function TutorProfileCourses({ courses }) {
    return (
        <div className="border border-tl-border rounded-2xl p-6 bg-white">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Teaches
            </p>
            <div className="flex flex-wrap gap-2">
                {courses.map(course => (
                    <div
                        key={course.id}
                        className="flex items-center gap-2 bg-tl-accent text-white px-3 py-1.5 rounded-lg text-sm"
                    >
                        <span className="font-semibold">{course.courseCode}</span>
                        <span className="text-white/70">{course.courseName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TutorProfileCourses