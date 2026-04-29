import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTutorById } from "../services/tutorService"

function TutorProfilePage() {
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTutor() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchTutorById(id);
                setTutor(data);
            } catch (err) {
                setError(err.message || "Could not load tutor");
            } finally {
                setLoading(false);
            }
        }

        if (id) loadTutor();
    }, [id]);

    if (loading) return <p className="py-10 text-center">Loading...</p>
    if (error) return <p className="py-10 text-center text-red-600">{error}</p>
    if (!tutor) return <p className="py-10 text-center">Tutor not found.</p>

     return (
        <div className="max-w-350 mx-auto px-6 py-10">
            Poop
        </div>
    )
}

export default TutorProfilePage