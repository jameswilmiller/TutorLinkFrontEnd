import { useParams } from "react-router-dom"
import { useApiClient } from "../hooks/useApiClient";
import { getTutorImage } from "../utils/getTutorImage";
import {useState, useEffect} from "react";
function TutorProfilePage() {
    const {id} = useParams();
    const api = useApiClient();

    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTutor() {
            try {
                const data = await api.get(`/tutors/${id}`);
                setTutor(data);
            } catch (err) {
                console.error(err);
                setError("could not load tutor")
            } finally {
                setLoading(false);
            }
        }

        loadTutor();
    }, [id]);

    if (loading) {
        return <p className= "py-10"> Loading Tutors...</p>
    }

    if (error) {
        return <p className ="py-10 text-red-600">{error}</p>
    }

    if (!tutor) {
        return <p className="py-10"> Tutor not found. </p>
    }


    return (
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* IMG */}
            <div>
                <img
                src={getTutorImage(tutor)}
                alt={tutor.username}
                className="w-full-h-[400px] object-cover rounded-2xl"
                />
            </div>

            {/* INFO */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        {tutor.firstname} {tutor.lastname}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {tutor.location || "Online"}
                    </p>
                </div>

                <div>
                    <p className="text-lg font-semibold">
                        {tutor.hourlyRate ? `$${tutor.hourlyRate}/hr` : "Rate not listed"}
                    </p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Subjects</h2>
                    <p>
                        {Array.isArray(tutor.subjects)
                            ? tutor.subjects.join(", ")
                            : tutor.subjects}
                    </p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">About</h2>
                    <p className="text-gray-600">
                        {tutor.bio || "No bio provided"}
                    </p>
                </div>

                <button className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
                    Book Lesson
                </button>
            </div>
        </div>
    )
} 
export default TutorProfilePage