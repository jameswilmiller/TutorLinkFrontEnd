import { useState } from "react";
import { useApiClient } from "../hooks/useApiClient";
import LocationAutoComplete from "./LocationAutoComplete";
function BrowseSearchBar({onResults, initialFilters = {} }) {
    const api = useApiClient();

    const [formData, setFormData] = useState({
        subject: initialFilters.subject || "",
        level: initialFilters.level || "",
        locationName: initialFilters.locationName || "",
        latitude: initialFilters.latitude ?? null,
        longitude: initialFilters.longitude ?? null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    function handlePlaceSelected(placeData) {
        setFormData((prev) => ({
            ...prev,
            locationName: placeData.locationName,
            latitude: placeData.latitude,
            longitude: placeData.longitude,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const results = await api.post("/tutors/search", formData);
            onResults(results, formData);
        } catch (err) {
            console.error(err);
            setError("Failed to search for tutors");
        } finally {
            setLoading(false);
        }
    }
    return (
    <div className="sticky top-16 z-30 bg-gray-50 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[2rem] border border-gray-200 bg-white px-4 py-4 shadow-sm lg:flex-row lg:items-center lg:gap-0 lg:px-2"
      >
        <div className="flex-1 px-4 lg:border-r lg:border-gray-200">
          <label className="mb-1 block text-xs font-semibold text-gray-900">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Math, English, Physics..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        <div className="flex-1 px-4 lg:border-r lg:border-gray-200">
          <label className="mb-1 block text-xs font-semibold text-gray-900">
            Location
          </label>

          <div className="min-w-0">
            <LocationAutoComplete
              value={formData.locationName}
              onPlaceSelected={handlePlaceSelected}
            />
          </div>
        </div>

        <div className="flex-1 px-4 lg:border-r lg:border-gray-200">
          <label className="mb-1 block text-xs font-semibold text-gray-900">
            Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          >
            <option value="">Any level</option>
            <option value="high-school">High School</option>
            <option value="university">University</option>
            <option value="adult">Adult Learner</option>
          </select>
        </div>

        <div className="px-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mx-auto mt-3 max-w-6xl px-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
    );
}
export default BrowseSearchBar