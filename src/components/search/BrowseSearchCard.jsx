import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutoComplete";
import { searchCourses } from "../../services/tutorService";

function BrowseSearchCard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("courseCode") || "");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState({
    locationName: searchParams.get("location") || "",
    latitude: searchParams.get("latitude") || "",
    longitude: searchParams.get("longitude") || "",
  });
  const sort = searchParams.get("sort") || "newest";
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchCourses(query);
        setSuggestions(results);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }, [query]);

  function handleSelect(course) {
    setSelectedCourse(course);
    setQuery(`${course.courseCode} — ${course.courseName}`);
    setShowDropdown(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (selectedCourse) {
      params.set("courseCode", selectedCourse.courseCode);
    } else {
      params.delete("courseCode");
    }

    if (location?.locationName && location?.latitude && location?.longitude) {
      params.set("location", location.locationName);
      params.set("latitude", location.latitude);
      params.set("longitude", location.longitude);
    } else {
      params.delete("location");
      params.delete("latitude");
      params.delete("longitude");
    }

    params.set("sort", sort);
    setSearchParams(params);
  }

  return (
    <div className="w-full bg-tl-bg py-6 border-b border-tl-border">
      <div className="px-6">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">

     
          <div className="relative flex-1 flex items-center bg-white border border-tl-border rounded-xl h-12 px-4">
            <svg className="w-4 h-4 text-tl-muted shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              placeholder="Search by course code or name..."
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCourse(null);
              }}
              className="flex-1 outline-none text-sm bg-transparent"
            />
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-tl-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                {suggestions.map(course => (
                  <li
                    key={course.id}
                    onClick={() => handleSelect(course)}
                    className="px-4 py-3 cursor-pointer hover:bg-tl-bg text-sm"
                  >
                    <span className="font-medium text-tl-ink">{course.courseCode}</span>
                    <span className="text-tl-muted ml-2">— {course.courseName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

         
          <div className="w-80 flex items-center bg-tl-bg border border-tl-border rounded-xl h-12 px-4">
            <svg className="w-4 h-4 text-tl-muted shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <PlacesAutoComplete onPlaceSelect={setLocation} initialValue={location.locationName}/>
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
  );
}

export default BrowseSearchCard;