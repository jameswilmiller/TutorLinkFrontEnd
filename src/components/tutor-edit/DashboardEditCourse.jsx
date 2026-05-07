import { useState, useEffect, useRef } from "react"
import EditableSection from "./EditableSection"
import { searchCourses } from "../../services/tutorService"

function DashboardEditCourse({ tutor, onSave }) {
    const [selectedCourses, setSelectedCourses] = useState(tutor.courses || [])
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const debounceRef = useRef(null)

    useEffect(() => {
        if (query.length < 2) { setSuggestions([]); setShowDropdown(false); return }
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            try {
                const results = await searchCourses(query)
                setSuggestions(results.filter(r => !selectedCourses.find(c => c.id === r.id)))
                setShowDropdown(true)
            } catch { setSuggestions([]) }
        }, 300)
    }, [query, selectedCourses])

    function addCourse(course) {
        setSelectedCourses(prev => [...prev, course])
        setQuery("")
        setShowDropdown(false)
    }

    function removeCourse(id) {
        setSelectedCourses(prev => prev.filter(c => c.id !== id))
    }

    const viewContent = selectedCourses.length === 0
        ? <p className="text-sm text-tl-muted">No courses added yet.</p>
        : (
            <div className="flex flex-wrap gap-2">
                {selectedCourses.map(course => (
                    <div key={course.id} className="flex items-center gap-2 bg-tl-accent text-white px-3 py-1.5 rounded-lg text-sm">
                        <span className="font-semibold">{course.courseCode}</span>
                        <span className="text-white/70">{course.courseName}</span>
                    </div>
                ))}
            </div>
        )

    return (
        <EditableSection
            label="Courses Taught"
            viewContent={viewContent}
            onSave={() => onSave({ courseIds: selectedCourses.map(c => c.id) })}
        >
            <div className="space-y-3">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search course code or name..."
                        className="w-full border border-tl-border rounded-xl px-4 py-2 text-sm outline-none focus:border-tl-accent"
                    />
                    {showDropdown && suggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-tl-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                            {suggestions.map(course => (
                                <li key={course.id} onClick={() => addCourse(course)} className="px-4 py-3 cursor-pointer hover:bg-tl-bg text-sm">
                                    <span className="font-medium">{course.courseCode}</span>
                                    <span className="text-tl-muted ml-2">— {course.courseName}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {selectedCourses.map(course => (
                        <div key={course.id} className="flex items-center gap-2 bg-tl-accent text-white px-3 py-1.5 rounded-lg text-sm">
                            <span className="font-semibold">{course.courseCode}</span>
                            <span className="text-white/70">{course.courseName}</span>
                            <button onClick={() => removeCourse(course.id)} className="ml-1 hover:text-white/70">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </EditableSection>
    )
}

export default DashboardEditCourse