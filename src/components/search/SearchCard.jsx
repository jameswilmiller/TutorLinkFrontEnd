import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutoComplete"
import { searchCourses } from "../../services/tutorService";

function SearchCard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [remote, setRemote] = useState(null);
  const [sort] = useState("newest");
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "true") setRemote(true);
    else if (value === "false") setRemote(false);
    else setRemote(null);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (selectedCourse) params.set("courseCode", selectedCourse.courseCode);
    if (location?.locationName) params.set("location", location.locationName);
    if (location?.latitude) params.set("latitude", location.latitude);
    if (location?.longitude) params.set("longitude", location.longitude);
    if (remote !== null) params.set("remote", remote);
    params.set("sort", sort);

    navigate(`/browse?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-row bg-white shadow rounded-2xl py-2 mt-15 max-w-full"
    >
      {/* Course search */}
      <div className="relative flex flex-col min-h-15 justify-start max-w-full items-start px-6 gap-2">
        <label className="text-tl-muted text-caption">COURSE</label>
        <input
          type="text"
          value={query}
          placeholder="e.g. MATH1051 or Calculus..."
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCourse(null);
          }}
          className="text-body-sm outline-none"
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

      <div className="mx-2 h-15 w-px bg-tl-border shrink-0" />

      <div className="flex flex-col max-w-full items-start px-6">
        <label className="text-tl-muted text-caption">WHERE</label>
        <PlacesAutoComplete onPlaceSelect={setLocation}/>
      </div>

      <div className="mx-2 h-15 w-px bg-tl-border shrink-0" />

      <div className="flex flex-col min-h-16 justify-start max-w-full items-start px-6 gap-3">
        <label className="text-tl-muted text-caption">MODE</label>
        <select
          value={remote ?? "any"}
          onChange={handleChange}
          className="text-body-sm outline-none cursor-pointer"
        >
          <option value="any">Remote or In Person</option>
          <option value="false">In Person</option>
          <option value="true">Remote</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-tl-accent text-white px-8 py-6 rounded-2xl text-body-sm font-medium hover:bg-tl-accent-hover transition cursor-pointer max-w-full"
      >
        Search
      </button>
    </form>
  );
}

export default SearchCard;