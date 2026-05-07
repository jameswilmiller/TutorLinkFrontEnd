import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTutorById } from "../services/tutorService"
import TutorProfileHeader from "../components/tutor/TutorProfileHeader"
import TutorBookingCard from "../components/tutor/TutorBookingCard"
import TutorProfileCourses from "../components/tutor/TutorProfileCourses"
import TutorProfileAbout from "../components/tutor/TutorProfileAbout"
import TutorProfileStyles from "../components/tutor/TutorProfileStyles.jsx"
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
        <div>
            <div className="bg-tl-surface border-b border-tl-border">
                <div className="max-w-350 mx-auto px-6 py-10">
                    <TutorProfileHeader tutor={tutor} />
                </div>
            </div>

            <div className="max-w-350 mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                    <div className="space-y-6">
                        {tutor.courses?.length > 0 && <TutorProfileCourses courses={tutor.courses} />}
                        <TutorProfileAbout tutor={tutor} />
                        {tutor.styles?.length > 0 && <TutorProfileStyles styles={tutor.styles} />}
                        {tutor.languages?.length > 0 && <TutorProfileLanguages languages={tutor.languages} />}
                    </div>
                    <div>
                        <TutorBookingCard tutor={tutor} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorProfilePage