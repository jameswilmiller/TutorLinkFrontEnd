import { useState, useEffect, useRef } from "react"
import { searchCourses } from "../../services/tutorService"

function EditableCourses({ tutor, onSave, allTutor }) {
    const [editing, setEditing] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState(tutor.courses || [])
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [saving, setSaving] = useState(false)
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

    async function handleSave() {
        setSaving(true)
        try {
            await onSave({ courseIds: selectedCourses.map(c => c.id) })
            setEditing(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="border border-tl-border rounded-2xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">Teaches</p>
                {!editing && (
                    <button onClick={() => setEditing(true)} className="text-sm text-tl-accent hover:underline">Edit</button>
                )}
            </div>

            {editing ? (
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search course code or name..."
                            className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent"
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
                            <div key={course.id} className="flex items-center gap-1 bg-tl-accent text-white px-3 py-1.5 rounded-lg text-sm">
                                <span>{course.courseCode}</span>
                                <button onClick={() => removeCourse(course.id)} className="ml-1 hover:text-white/70">×</button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover disabled:opacity-70">
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <button onClick={() => setEditing(false)} className="px-4 py-2 border border-tl-border text-tl-ink rounded-xl text-sm hover:bg-tl-bg">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {tutor.courses?.map(course => (
                        <div key={course.id} className="flex items-center gap-2 bg-tl-accent text-white px-3 py-1.5 rounded-lg text-sm">
                            <span className="font-semibold">{course.courseCode}</span>
                            <span className="text-white/70">{course.courseName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EditableCourses