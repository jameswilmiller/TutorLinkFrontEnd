import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import CourseAutocomplete from "./CourseAutocomplete"
import PlacesAutoComplete from "./PlacesAutoComplete"

function BrowseSearchCard() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [query, setQuery] = useState(searchParams.get("courseCode") || "")
    const [location, setLocation] = useState({
        locationName: searchParams.get("location") || "",
        latitude: searchParams.get("latitude") || "",
        longitude: searchParams.get("longitude") || "",
    })

    function handleSubmit(event) {
        event.preventDefault()
        const params = new URLSearchParams(searchParams)

        if (selectedCourse) {
            params.set("courseCode", selectedCourse.courseCode)
        } else if (query.trim()) {
            params.set("courseCode", query.trim())
        } else {
            params.delete("courseCode")
        }

        if (location?.locationName && location?.latitude && location?.longitude) {
            params.set("location", location.locationName)
            params.set("latitude", location.latitude)
            params.set("longitude", location.longitude)
        } else {
            params.delete("location")
            params.delete("latitude")
            params.delete("longitude")
        }

        params.delete("page")
        setSearchParams(params)
    }

    return (
        <div className="w-full bg-tl-bg py-6 border-b border-tl-border">
            <div className="px-6">
                <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                    <div className="relative flex-1 flex items-center bg-white border border-tl-border rounded-xl h-12 px-4">
                        <svg className="w-4 h-4 text-tl-muted shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <CourseAutocomplete
                            initialValue={query}
                            onSelect={setSelectedCourse}
                            onQueryChange={value => { setQuery(value); setSelectedCourse(null) }}
                            placeholder="Search by course code or name..."
                            className="flex-1 outline-none text-sm bg-transparent"
                        />
                    </div>

                    <div className="w-80 flex items-center bg-tl-bg border border-tl-border rounded-xl h-12 px-4">
                        <svg className="w-4 h-4 text-tl-muted shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <PlacesAutoComplete onPlaceSelect={setLocation} initialValue={location.locationName} />
                    </div>

                    <button
                        type="submit"
                        className="h-12 px-8 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover cursor-pointer text-sm font-medium"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BrowseSearchCard