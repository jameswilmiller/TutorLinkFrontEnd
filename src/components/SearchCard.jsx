import { useState } from "react";
import LocationAutoComplete from "./LocationAutoComplete";
import { useApiClient } from "../hooks/useApiClient";

function SearchCard({onSearchResults}) {
    const api = useApiClient();
    const [formData, setFormData] = useState({
        subject: "",
        level: "",
        date:"",
        locationName: "",
        latitude: null,
        longitude: null,
    })

    const [loading, setLoading]  = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handlePlaceSelected(placeData) {
        setFormData((prev) => ({
            ...prev,
            locationName: placeData.locationName,
            latitude: placeData.latitude,
            longitude: placeData.longitude
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await api.post("/tutors/search", formData);
            onSearchResults(data, formData);
        } catch (err) {
            console.error(err);
            setError("Failed to search for tutors");
        } finally {
            setLoading(false);
        }
    }

    


    return(
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
                    value={formData.date || ""}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
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

            {error && <p className="m-4 text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">

                    {loading ? "Searching... " : "Find Tutors"}
                </button>
        </form>
    )

    
    
    

}
export default SearchCard;