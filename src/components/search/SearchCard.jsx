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
      className="flex items-stretch bg-white shadow rounded-2xl mt-10 p-2 max-w-3xl mx-auto"
    >
      <div className="relative flex-1 flex flex-col justify-center px-5 text-left">
        <label className="text-tl-muted text-caption uppercase tracking-wider">Course</label>
        <input
          type="text"
          value={query}
          placeholder="e.g. MATH1051 or Calculus"
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCourse(null);
          }}
          className="text-body-sm outline-none mt-1 w-full"
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
      </div>

      <div className="hidden md:flex w-px bg-tl-border my-2" />

      
      <div className="hidden md:flex flex-1  flex-col justify-center px-5 text-left">
        <label className="text-tl-muted text-caption uppercase tracking-wider">Where</label>
        <div className="mt-1">
          <PlacesAutoComplete onPlaceSelect={setLocation}/>
        </div>
      </div>

      <div className="hidden md:flex w-px bg-tl-border my-2" />

      
      <div className="hidden md:flex flex-1 flex-col justify-center px-5 text-left">
        <label className="text-tl-muted text-caption uppercase tracking-wider">Mode</label>
        <select
          value={remote ?? "any"}
          onChange={handleChange}
          className="text-body-sm outline-none cursor-pointer mt-1 bg-transparent"
        >
          <option value="any">Any</option>
          <option value="false">In Person</option>
          <option value="true">Remote</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-tl-accent text-white px-8 rounded-xl text-body-sm font-medium hover:bg-tl-accent-hover transition cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default SearchCard;