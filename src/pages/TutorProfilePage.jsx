import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTutorById } from "../services/tutorService"
import TutorProfileHeader from "../components/tutor/TutorProfileHeader"
import TutorBookingCard from "../components/tutor/TutorBookingCard"
import TutorProfileCourses from "../components/tutor/TutorProfileCourses"
import TutorProfileAbout from "../components/tutor/TutorProfileAbout"
import TutorProfileStyles from "../components/tutor/TutorProfileStyles.jsx"
import TutorProfileCredentials from "../components/tutor/TutorProfileCredentials"
import TutorProfileLanguages from "../components/tutor/TutorProfileLanguages"

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
        <div className="mx-auto max-w-350 px-6 py-8">
            <TutorProfileHeader tutor={tutor} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                <div className="space-y-8">
                    {tutor.courses?.length > 0 && <TutorProfileCourses courses={tutor.courses} />}
                    <TutorProfileAbout tutor={tutor} />
                    {tutor.styles?.length > 0 && <TutorProfileStyles styles={tutor.styles} />}
                    {tutor.languages?.length > 0 && <TutorProfileLanguages languages={tutor.languages} />}
                </div>
                <div className="space-y-6">
                    <TutorBookingCard tutor={tutor} />
                    {tutor.credentials?.length > 0 && <TutorProfileCredentials credentials={tutor.credentials} />}
                </div>
            </div>
        </div>
    )
}

export default TutorProfilePage