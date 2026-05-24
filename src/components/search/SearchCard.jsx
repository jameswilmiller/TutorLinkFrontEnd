import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CourseAutoComplete from "./CourseAutoComplete"
import PlacesAutoComplete from "./PlacesAutoComplete"

function SearchCard() {
    const navigate = useNavigate()
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [query, setQuery] = useState("")
    const [location, setLocation] = useState(null)
    const [remote, setRemote] = useState(null)

    function handleModeChange(event) {
        const value = event.target.value
        if (value === "true") setRemote(true)
        else if (value === "false") setRemote(false)
        else setRemote(null)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const params = new URLSearchParams()

        if (selectedCourse) {
            params.set("courseCode", selectedCourse.courseCode)
        } else if (query.trim()) {
            params.set("courseCode", query.trim())
        }

        if (location?.locationName) params.set("location", location.locationName)
        if (location?.latitude) params.set("latitude", location.latitude)
        if (location?.longitude) params.set("longitude", location.longitude)
        if (remote !== null) params.set("remote", remote)
        params.set("sort", "newest")

        navigate(`/browse?${params.toString()}`)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-stretch bg-white shadow rounded-2xl mt-10 p-2 max-w-3xl mx-auto"
        >
            <div className="relative flex-1 flex flex-col justify-center px-5 text-left">
                <label className="text-tl-muted text-xs uppercase tracking-wider">Course</label>
                <div className="mt-1">
                    <CourseAutoComplete
                        onSelect={setSelectedCourse}
                        onQueryChange={value => { setQuery(value); setSelectedCourse(null) }}
                    />
                </div>
            </div>

            <div className="hidden md:flex w-px bg-tl-border my-2" />

            <div className="hidden md:flex flex-1 flex-col justify-center px-5 text-left">
                <label className="text-tl-muted text-xs uppercase tracking-wider">Where</label>
                <div className="mt-1">
                    <PlacesAutoComplete onPlaceSelect={setLocation} />
                </div>
            </div>

            <div className="hidden md:flex w-px bg-tl-border my-2" />

            <div className="hidden md:flex flex-1 flex-col justify-center px-5 text-left">
                <label className="text-tl-muted text-xs uppercase tracking-wider">Mode</label>
                <select
                    value={remote ?? "any"}
                    onChange={handleModeChange}
                    className="text-sm outline-none cursor-pointer mt-1 bg-transparent"
                >
                    <option value="any">Any</option>
                    <option value="false">In Person</option>
                    <option value="true">Remote</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-tl-accent text-white px-8 rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition cursor-pointer"
            >
                Search
            </button>
        </form>
    )
}

export default SearchCard