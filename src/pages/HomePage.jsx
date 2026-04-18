import { useEffect, useState } from "react";
import {useApiClient} from "../hooks/useApiClient"
import { useNavigate } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";
import TutorCarousel from "../components/tutor/TutorCarousel";

function HomePage() {
    const api = useApiClient();
    const navigate = useNavigate();

    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

   
    useEffect(() => {
        async function loadTutors() {
            try {
                const data = await fetchTutors();
                setTutors(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load tutors");
            } finally {
                setLoading(false);
            }
        }
        loadTutors();
    }, []);

    if (loading) {
        return <div className="py-16 text-sm text-gray-500">Loading tutors...</div>
    }
    if (error) {
        return <div className="py-16 text-sm text-red-600">{error}</div>
    }


    return (
        <TutorCarousel tutors={tutors}/>
    )
    
}
export default HomePage;