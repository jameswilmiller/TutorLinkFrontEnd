import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTutorBySlug } from "../services/tutorService"
import TutorProfileHeader from "../components/tutor/TutorProfileHeader"
import TutorBookingCard from "../components/tutor/TutorBookingCard"
import TutorProfileCourses from "../components/tutor/TutorProfileCourses"
import TutorProfileAbout from "../components/tutor/TutorProfileAbout"
import TutorProfileCredentials from "../components/tutor/TutorProfileCredentials"
import TutorProfileStyles from "../components/tutor/TutorProfileStyles"
import TutorProfileLanguages from "../components/tutor/TutorProfileLanguages"
import TutorReviews from "../components/review/TutorReviews"

function TutorProfilePage() {
    const { slug } = useParams()
    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
  
        async function loadTutor() {
            try {
                setLoading(true)
                setError("")
                const data = await fetchTutorBySlug(slug)
                setTutor(data)
            } catch (err) {
                setError(err.message || "Could not load tutor")
            } finally {
                setLoading(false)
            }
        }
        loadTutor()
    }, [slug])

    if (loading) return <p className="py-10 text-center text-tl-muted text-sm">Loading...</p>
    if (error) return <p role="alert" className="py-10 text-center text-red-500 text-sm">{error}</p>
    if (!tutor) return <p className="py-10 text-center text-tl-muted text-sm">Tutor not found.</p>

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
                        <TutorReviews tutorId={tutor.id} averageRating={tutor.averageRating} reviewCount={tutor.reviewCount}/>
                        {tutor.courses?.length > 0 && <TutorProfileCourses courses={tutor.courses} />}
                        <TutorProfileAbout tutor={tutor} />
                        {tutor.credentials?.length > 0 && <TutorProfileCredentials credentials={tutor.credentials} />}
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