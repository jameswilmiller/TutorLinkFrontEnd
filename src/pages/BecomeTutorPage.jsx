import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getMyTutorProfile, createTutorProfile, updateTutorProfile } from "../services/tutorService"
import { apiPost } from "../services/apiClient"
import WizardStep1 from "../components/become-tutor/WizardStep1"
import WizardStep2 from "../components/become-tutor/WizardStep2"
import WizardStep3 from "../components/become-tutor/WizardStep3"
import WizardStep4 from "../components/become-tutor/WizardStep4"
import WizardStepIndicator from "../components/become-tutor/WizardStepIndicator.jsx"

const STEPS = ["Basic Info", "Courses", "Teaching Style", "Photo"]

const EMPTY_FORM = {
    bio: "",
    tagline: "",
    hourlyRate: "",
    location: "",
    latitude: null,
    longitude: null,
    remote: false,
    courseIds: [],
    faculties: [],
    styles: [],
    credentials: [],
    languages: [],
    profileImageKey: "",
}

function BecomeTutorPage() {
    const { accessToken } = useAuth()
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [existingProfile, setExistingProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadExisting() {
            try {
                const profile = await getMyTutorProfile(accessToken)
                setExistingProfile(profile)
                setFormData({
                    bio: profile.bio || "",
                    tagline: profile.tagline || "",
                    hourlyRate: profile.hourlyRate || "",
                    location: profile.location || "",
                    latitude: profile.latitude || null,
                    longitude: profile.longitude || null,
                    remote: profile.remote || false,
                    courseIds: profile.courses?.map(c => c.id) || [],
                    faculties: profile.faculties || [],
                    styles: profile.styles?.map(s => ({ label: s.label, description: s.description })) || [],
                    credentials: profile.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || [],
                    languages: profile.languages?.map(l => ({ language: l.language, level: l.level })) || [],
                    profileImageKey: profile.profileImageKey || "",
                })
            } catch {
                // no profile yet, start fresh
            } finally {
                setLoading(false)
            }
        }
        loadExisting()
    }, [accessToken])

    function updateForm(fields) {
        setFormData(prev => ({ ...prev, ...fields }))
    }

   async function saveStep(nextStep) {
    setSaving(true)
    setError("")
    try {
        if (!existingProfile) {
            // give user tutor role first if they don't have it
            await apiPost("/users/me/become-tutor", null, accessToken)
            const created = await createTutorProfile(formData, accessToken)
            setExistingProfile(created)
        } else {
            await updateTutorProfile(formData, accessToken)
        }

        if (nextStep > 4) {
            const profile = await getMyTutorProfile(accessToken)
            navigate(`/tutors/${profile.id}`)
        } else {
            setStep(nextStep)
        }
    } catch (err) {
        setError(err.message || "Failed to save")
    } finally {
        setSaving(false)
    }
}
    if (loading) return <p className="py-10 text-center">Loading...</p>

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl text-tl-ink mb-2">Become a tutor</h1>
            <p className="text-tl-muted mb-8">Set up your profile so students can find you.</p>

            <WizardStepIndicator steps={STEPS} currentStep={step} onStepClick={setStep} />

            <div className="mt-10">
                {step === 1 && (
                    <WizardStep1
                        formData={formData}
                        updateForm={updateForm}
                        onNext={() => saveStep(2)}
                        saving={saving}
                        error={error}
                    />
                )}
                {step === 2 && (
                    <WizardStep2
                        formData={formData}
                        updateForm={updateForm}
                        onNext={() => saveStep(3)}
                        onBack={() => setStep(1)}
                        saving={saving}
                        error={error}
                    />
                )}
                {step === 3 && (
                    <WizardStep3
                        formData={formData}
                        updateForm={updateForm}
                        onNext={() => saveStep(4)}
                        onBack={() => setStep(2)}
                        saving={saving}
                        error={error}
                    />
                )}
                {step === 4 && (
                    <WizardStep4
                        formData={formData}
                        updateForm={updateForm}
                        existingProfile={existingProfile}
                        onFinish={() => saveStep(5)}
                        onBack={() => setStep(3)}
                        saving={saving}
                        error={error}
                    />
                )}
            </div>
        </div>
    )
}

export default BecomeTutorPage