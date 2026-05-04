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
    <div className="w-full bg-white py-3 shadow-lg border-b border-tl-border">
      <div className="max-w-350 mx-auto px-6">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              placeholder="Search by course code or name..."
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCourse(null);
              }}
              className="w-full border h-14 px-4 border-tl-border rounded-xl outline-none"
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

          <div className="w-70 h-14 px-3 border border-tl-border rounded-xl flex items-center">
            <PlacesAutoComplete onPlaceSelect={setLocation} initialValue={location.locationName}/>
          </div>

          <button
            type="submit"
            className="h-12 px-6 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default BrowseSearchCard;