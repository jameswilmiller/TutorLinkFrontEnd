import { useLocation } from "react-router-dom";
import { useApiClient } from "../hooks/useApiClient";
import { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard"
import BrowseSearchBar from "../components/BrowseSearchBar";
function BrowsePage(){
    const api = useApiClient();
    const location = useLocation();

    const [tutors, setTutors] = useState(location.state?.tutors || [])
    const [filters, setFilters] = useState(location.state?.filters || {})
    const [sortBy, setSortBy] = useState("recommended");
    const [loading, setLoading] = useState(location.state?.tutors === undefined);
    const [error, setError] = useState("");

    useEffect(() => {
        if (location.state?.tutors !== undefined) {
          setLoading(false);
          return;
        }

        async function loadTutors() {
            try {
                const data = await api.get("/tutors")
                setTutors(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load tutors")
            } finally {
                setLoading(false);
            }
        }
        loadTutors();
    }, []);
    
    function handleSearchResults(results, searchFilters) {
        setTutors(results);
        setFilters(searchFilters)
        setError("")
        setLoading(false);
    }

    function handleSortChange(e) {
        setSortBy(e.target.value);
    }

    function getSortedTutors() {
        const sorted = [...tutors];

        if (sortBy === "price-low-high") {
            sorted.sort((a,b) => {
                const aRate = a.hourlyRate ?? Number.POSITIVE_INFINITY;
                const bRate = b.hourlyRate ?? Number.POSITIVE_INFINITY;
                return aRate - bRate;
            })
        }

        if (sortBy === "price-high-low") {
            sorted.sort((a,b) => {
                const aRate = a.hourlyRate ?? Number.NEGATIVE_INFINITY;
                const bRate = b.hourlyRate ?? Number.NEGATIVE_INFINITY;
                return bRate - aRate;
            })
        }
        return sorted;
    }

    const displayedTutors = getSortedTutors();
   
    return (
    <div className="pb-12">
      <BrowseSearchBar
        onResults={handleSearchResults}
        initialFilters={filters}
      />

      <section className="pt-2">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {loading ? "Loading tutors..." : `${displayedTutors.length} tutors found`}
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Browse tutors
            </h1>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">
              Sort by
            </label>

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-600">{error}</p>
        )}

        {loading ? (
          <div className="py-16 text-sm text-gray-500">Loading tutors...</div>
        ) : displayedTutors.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-600">
            No tutors found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {displayedTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
    
}
export default BrowsePage;