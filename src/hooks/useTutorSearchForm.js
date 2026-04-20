import {useState, useCallback} from "react";
import {useAuth} from "./useAuth";
import {searchTutors} from "../services/tutorService"

export function useTutorSearchForm(onResults, initialFilters = {}) {
    const {accessToken} = useAuth();

    const [formData, setFormData] = useState({
        subject: initialFilters.subject || "",
        level: initialFilters.level || "",
        date: initialFilters.date || "",
        locationName: initialFilters.locationName || "",
        latitude: initialFilters.latitude ?? null,
        longitude: initialFilters.longitude ?? null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handlePlaceSelected = useCallback((placeData) => {
        setFormData((prev) => ({
            ...prev,
            locationName: placeData.locationName,
            latitude: placeData.latitude,
            longitude: placeData.longitude,
        }))
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const results = await searchTutors(formData, accessToken)

            if (onResults) {
                onResults(results, formData)
            }
        } catch (err) {
            console.error(err)
            setError(err.message || "Failed to search for tutors")
        } finally {
            setLoading(false);
        }
    }, [formData, accessToken, onResults]);

    return {
        formData,
        setFormData,
        loading,
        error,
        handleChange,
        handlePlaceSelected,
        handleSubmit,
    };
}
