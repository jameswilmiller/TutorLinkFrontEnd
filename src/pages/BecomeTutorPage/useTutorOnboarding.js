import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {getMyTutorProfile, createTutorProfile, updateTutorProfile} from "../../services/tutorService"
import { apiPost } from "../../services/apiClient"
import {EMPTY_FORM, profileToFormData, formDataToPayload, STEP_VALIDATORS} from "./formData"

const TOTAL_STEPS = 4

export function useTutorOnboarding(accessToken) {
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [existingProfile, setExistingProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

   
    useEffect(() => {
        let cancelled = false
        getMyTutorProfile(accessToken)
            .then(profile => {
                if (cancelled) return
                setExistingProfile(profile)
                setFormData(profileToFormData(profile))
            })
            .catch(() => { /* no profile yet */ })
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [accessToken])

    function updateForm(fields) {
        setFormData(prev => ({ ...prev, ...fields }))
        if (error) setError("")
    }

    async function saveAndAdvance() {
        const validationError = STEP_VALIDATORS[step - 1](formData)
        if (validationError) {
            setError(validationError)
            return
        }

        setSaving(true)
        setError("")
        try {
            const payload = formDataToPayload(formData)

            if (!existingProfile) {
                await apiPost("/users/me/become-tutor", null, accessToken)
                const created = await createTutorProfile(payload, accessToken)
                setExistingProfile(created)
            } else {
                await updateTutorProfile(payload, accessToken)
            }

            if (step === TOTAL_STEPS) {
                const fresh = await getMyTutorProfile(accessToken)
                navigate(`/tutors/${fresh.id}`)
            } else {
                setStep(step + 1)
            }
        } catch (err) {
            setError(err.message || "Failed to save. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    function goBack() {
        if (step > 1) {
            setStep(step - 1)
            setError("")
        }
    }

    return {
        step,
        totalSteps: TOTAL_STEPS,
        formData,
        existingProfile,
        loading,
        saving,
        error,
        updateForm,
        saveAndAdvance,
        goBack,
    }
}