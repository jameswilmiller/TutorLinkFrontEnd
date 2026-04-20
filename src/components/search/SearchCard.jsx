import LocationAutoComplete from "../shared/LocationAutoComplete";
import { useTutorSearchForm } from "../../hooks/useTutorSearchForm";

function SearchCard({ onSearchResults }) {
    const {
        formData,
        loading,
        error,
        handleChange,
        handlePlaceSelected,
        handleSubmit,
    } = useTutorSearchForm(onSearchResults, {
        subject: "",
        level: "",
        date: "",
        locationName: "",
        latitude: null,
        longitude: null,
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Subject
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Math, English, Physics..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Level
                    </label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                        <option value="">Any level</option>
                        <option value="high-school">High School</option>
                        <option value="university">University</option>
                        <option value="adult">Adult Learner</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <div className="rounded-xl border border-gray-300 px-3 py-2 focus-within:border-indigo-500">
                        <LocationAutoComplete
                            value={formData.locationName}
                            onPlaceSelected={handlePlaceSelected}
                        />
                    </div>
                </div>
            </div>

            {error && (
                <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Searching..." : "Find Tutors"}
            </button>
        </form>
    );
}

export default SearchCard;