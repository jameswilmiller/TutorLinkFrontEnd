import { useState, useEffect, useRef } from "react"
import { searchCourses } from "../../services/tutorService"
import Field from "../../components/ui/Field"
import TextInput from "../../components/ui/TextInput"
import WizardActions from "./WizardActions"

const FACULTIES = [
    { label: "Business, Economics & Law", value: "BUSINESS_ECONOMICS_LAW" },
    { label: "Engineering, Architecture & IT", value: "ENGINEERING_ARCHITECTURE_IT" },
    { label: "Health, Medicine & Behavioural Sciences", value: "HEALTH_MEDICINE_BEHAVIOURAL_SCIENCES" },
    { label: "Humanities, Arts & Social Sciences", value: "HUMANITIES_ARTS_SOCIAL_SCIENCES" },
    { label: "Science", value: "SCIENCE" },
]

function Step2Courses({ formData, updateForm, onNext, onBack, saving, error, nextLabel }) {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const debounceRef = useRef(null)
    const selectedIds = formData.courses.map(c => c.id)

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            try {
                const results = await searchCourses(query)
                setSuggestions(results.filter(r => !selectedIds.includes(r.id)))
            } catch {
                setSuggestions([])
            }
        }, 300)
        return () => clearTimeout(debounceRef.current)
    }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

    function addCourse(course) {
        updateForm({ courses: [...formData.courses, course] })
        setQuery("")
        setSuggestions([])
    }

    function removeCourse(courseId) {
        updateForm({ courses: formData.courses.filter(c => c.id !== courseId) })
    }

    function toggleFaculty(value) {
        const current = formData.faculties
        updateForm({
            faculties: current.includes(value)
                ? current.filter(f => f !== value)
                : [...current, value],
        })
    }

    return (
        <div className="space-y-8">
            <Field label="Courses you teach *">
                <div className="relative">
                    <TextInput
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by course code or name..."
                    />
                    {suggestions.length > 0 && (
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

                {formData.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.courses.map(course => (
                            <div key={course.id} className="flex items-center gap-1 bg-tl-accent text-white px-3 py-1 rounded-lg text-sm">
                                <span>{course.courseCode}</span>
                                <button onClick={() => removeCourse(course.id)} className="ml-1 hover:text-white/70">×</button>
                            </div>
                        ))}
                    </div>
                )}
            </Field>

            <Field label="Faculties">
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
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <WizardActions onNext={onNext} onBack={onBack} saving={saving} nextLabel={nextLabel} />
        </div>
    )
}

export default Step2Courses