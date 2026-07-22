import { updateTutorProfile } from "../../services/tutorService"
import { useAuth } from "../../hooks/useAuth"
import DashboardEditHeader from "./DashboardEditHeader"
import DashboardEditAbout from "./DashboardEditAbout"
import DashboardEditRate from "./DashboardEditRate"
import DashboardEditLocation from "./DashboardEditLocation"
import DashboardEditCourse from "./DashboardEditCourse"
import DashboardEditCredentials from "./DashboardEditCredentials"
import DashboardEditStyles from "./DashboardEditStyles"
import DashboardEditFaculty from "./DashboardEditFaculty"
function toRequestDto(t) {
    return {
        bio: t.bio,
        tagline: t.tagline,
        location: t.location,
        latitude: t.latitude,
        longitude: t.longitude,
        remote: t.remote,
        hourlyRate: t.hourlyRate,
        courseIds: t.courses?.map(c => c.id) || [],
        faculties: t.faculties || [],
        styles: t.styles?.map(s => ({ label: s.label, description: s.description })) || [],
        credentials: t.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || [],
        languages: t.languages?.map(l => ({ language: l.language, level: l.level })) || [],
    }
}

function DashboardEdit({ tutor, setTutor }) {
    const { accessToken } = useAuth()

    async function save(updates) {
        const updated = { ...toRequestDto(tutor), ...updates }
        const fresh = await updateTutorProfile(updated, accessToken)
        setTutor(fresh)
    }

    function onImageReplaced({ imageKey, imageUrl }) {
        setTutor(prev => ({ ...prev, profileImageKey: imageKey, profileImageUrl: imageUrl }))
    }
    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <DashboardEditHeader tutor={tutor} onSave={save} onImageReplaced={onImageReplaced} />
            <DashboardEditAbout tutor={tutor} onSave={save} />
            <DashboardEditRate tutor={tutor} onSave={save} />
            <DashboardEditLocation tutor={tutor} onSave={save} />
            <DashboardEditCourse tutor={tutor} onSave={save} />
            <DashboardEditFaculty tutor={tutor} onSave={save} />
            <DashboardEditCredentials tutor={tutor} onSave={save} />
            <DashboardEditStyles tutor={tutor} onSave={save} />
        </div>
    )
}

export default DashboardEdit