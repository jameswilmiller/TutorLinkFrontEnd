import { useState, useEffect, useRef } from "react"
import { searchCourses } from "../../services/tutorService"

const FACULTIES = [
    { label: "Business, Economics & Law", value: "BUSINESS_ECONOMICS_LAW" },
    { label: "Engineering, Architecture & IT", value: "ENGINEERING_ARCHITECTURE_IT" },
    { label: "Health, Medicine & Behavioural Sciences", value: "HEALTH_MEDICINE_BEHAVIOURAL_SCIENCES" },
    { label: "Humanities, Arts & Social Sciences", value: "HUMANITIES_ARTS_SOCIAL_SCIENCES" },
    { label: "Science", value: "SCIENCE" },
]

function WizardStep2({ formData, updateForm, onNext, onBack, saving, error }) {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState([])
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
                setSuggestions(results.filter(r => !formData.courseIds.includes(r.id)))
                setShowDropdown(true)
            } catch {
                setSuggestions([])
            }
        }, 300)
    }, [query, formData.courseIds])

    function addCourse(course) {
        setSelectedCourses(prev => [...prev, course])
        updateForm({ courseIds: [...formData.courseIds, course.id] })
        setQuery("")
        setShowDropdown(false)
    }

    function removeCourse(courseId) {
        setSelectedCourses(prev => prev.filter(c => c.id !== courseId))
        updateForm({ courseIds: formData.courseIds.filter(id => id !== courseId) })
    }

    function toggleFaculty(value) {
        const current = formData.faculties
        if (current.includes(value)) {
            updateForm({ faculties: current.filter(f => f !== value) })
        } else {
            updateForm({ faculties: [...current, value] })
        }
    }

    return (
        <div className="space-y-8">
            {/* Course search */}
            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Courses you teach</label>
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by course code or name..."
                        className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent"
                    />
                    {showDropdown && suggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-tl-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                            {suggestions.map(course => (
                                <li
                                    key={course.id}
                                    onClick={() => addCourse(course)}
                                    className="px-4 py-3 cursor-pointer hover:bg-tl-bg text-sm"
                                >
                                    <span className="font-medium text-tl-ink">{course.courseCode}</span>
                                    <span className="text-tl-muted ml-2">— {course.courseName}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedCourses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {selectedCourses.map(course => (
                            <div key={course.id} className="flex items-center gap-1 bg-tl-accent text-white px-3 py-1 rounded-lg text-sm">
                                <span>{course.courseCode}</span>
                                <button onClick={() => removeCourse(course.id)} className="ml-1 hover:text-white/70">×</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Faculty */}
            <div>
                <label className="block text-sm font-medium text-tl-ink mb-2">Faculties</label>
                <div className="space-y-2">
                    {FACULTIES.map(f => (
                        <label key={f.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.faculties.includes(f.value)}
                                onChange={() => toggleFaculty(f.value)}
                                className="accent-tl-accent"
                            />
                            <span className="text-sm text-tl-ink">{f.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
                <button onClick={onBack} className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition">
                    Back
                </button>
                <button onClick={onNext} disabled={saving} className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition disabled:opacity-70">
                    {saving ? "Saving..." : "Save & Continue"}
                </button>
            </div>
        </div>
    )
}

export default WizardStep2