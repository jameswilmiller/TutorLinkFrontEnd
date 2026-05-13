import { useState, useEffect, useRef } from "react"
import { searchCourses } from "../../services/tutorService"

function CourseAutocomplete({ initialValue = "", onSelect, onQueryChange, placeholder = "e.g. MATH1051 or Calculus", className = "" }) {
    const [query, setQuery] = useState(initialValue)
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const debounceRef = useRef(null)

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([])
            setShowDropdown(false)
            return
        }

        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            try {
                const results = await searchCourses(query)
                setSuggestions(results)
                setShowDropdown(true)
            } catch {
                setSuggestions([])
            }
        }, 300)

        return () => clearTimeout(debounceRef.current)
    }, [query])

    function handleChange(e) {
        const value = e.target.value
        setQuery(value)
        onQueryChange?.(value)
    }

    function handleSelect(course) {
        setQuery(`${course.courseCode} — ${course.courseName}`)
        setShowDropdown(false)
        onSelect?.(course)
    }

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className={className || "w-full text-sm outline-none bg-transparent"}
            />
            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-tl-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {suggestions.map(course => (
                        <li
                            key={course.id}
                            onClick={() => handleSelect(course)}
                            className="px-4 py-3 cursor-pointer hover:bg-tl-bg text-sm text-left"
                        >
                            <span className="font-medium text-tl-ink">{course.courseCode}</span>
                            <span className="text-tl-muted ml-2">— {course.courseName}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default CourseAutocomplete