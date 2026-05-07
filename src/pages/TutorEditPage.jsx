import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getMyTutorProfile, updateTutorProfile } from "../services/tutorService"
import { getTutorImage } from "../utils/getTutorImage"
import ProfileImageUploader from "../components/common/ProfileImageUploader"
import EditableAbout from "../components/tutor-edit/EditableAbout"
import EditableCourses from "../components/tutor-edit/EditableCourses"
import EditableStyles from "../components/tutor-edit/EditableStyles"
import EditableCredentials from "../components/tutor-edit/EditableCredentials"
import EditableHeader from "../components/tutor-edit/EditableHeader"
import EditableBookingCard from "../components/tutor-edit/EditableBookingCard"

function TutorEditPage() {
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function load() {
            try {
                const data = await getMyTutorProfile(accessToken)
                setTutor(data)
            } catch {
                setError("Could not load your tutor profile")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [accessToken])

    async function save(updates) {
        const updated = { ...toRequestDto(tutor), ...updates }
        await updateTutorProfile(updated, accessToken)
        setTutor(prev => ({ ...prev, ...updates }))
    }

    function toRequestDto(t) {
        return {
            bio: t.bio,
            tagline: t.tagline,
            location: t.location,
            latitude: t.latitude,
            longitude: t.longitude,
            remote: t.remote,
            hourlyRate: t.hourlyRate,
            profileImageKey: t.profileImageKey,
            courseIds: t.courses?.map(c => c.id) || [],
            faculties: t.faculties || [],
            styles: t.styles?.map(s => ({ label: s.label, description: s.description })) || [],
            credentials: t.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || [],
            languages: t.languages?.map(l => ({ language: l.language, level: l.level })) || [],
        }
    }

    if (loading) return <p className="py-10 text-center">Loading...</p>
    if (error) return <p className="py-10 text-center text-red-600">{error}</p>
    if (!tutor) return <p className="py-10 text-center">No tutor profile found.</p>

    return (
        <div className="mx-auto max-w-350 px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-3xl text-tl-ink">Edit your listing</h1>
                <button
                    onClick={() => navigate(`/tutors/${tutor.id}`)}
                    className="text-sm text-tl-muted hover:text-tl-ink border border-tl-border px-4 py-2 rounded-xl"
                >
                    View public profile →
                </button>
            </div>

            <EditableHeader tutor={tutor} onSave={save} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                <div className="space-y-8">
                    <EditableCourses tutor={tutor} onSave={save} allTutor={toRequestDto(tutor)} />
                    <EditableAbout tutor={tutor} onSave={save} />
                    <EditableStyles tutor={tutor} onSave={save} />
                </div>
                <div className="space-y-6">
                    <EditableBookingCard tutor={tutor} onSave={save} />
                    <EditableCredentials tutor={tutor} onSave={save} />
                </div>
            </div>
        </div>
    )
}

export default TutorEditPage