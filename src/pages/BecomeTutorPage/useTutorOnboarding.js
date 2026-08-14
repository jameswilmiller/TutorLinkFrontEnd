import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import {getMyTutorProfile, createTutorProfile, updateTutorProfile} from "../../services/tutorService"
import {EMPTY_FORM, profileToFormData, formDataToPayload, STEP_VALIDATORS} from "./formData"
import { getCurrentUser } from "../../services/authService"
const TOTAL_STEPS = 4

export function useTutorOnboarding() {
    const navigate = useNavigate()
    const { accessToken, setUser, authedRequest } = useAuth()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [existingProfile, setExistingProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

   
    useEffect(() => {
        if (!accessToken) return
        let cancelled = false
        authedRequest(token => getMyTutorProfile(token))
            .then(profile => {
                if (cancelled) return
                if (profile.profileImageKey) {
                    navigate("/tutor/dashboard", {replace: true})
                    return
                }
                setExistingProfile(profile)
                setFormData(profileToFormData(profile))
            })
            .catch(() => { /* 404 = no profile yet, which is the normal case here */ })
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [accessToken, authedRequest, navigate])

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
                const created = await authedRequest(token => createTutorProfile(payload, token))
                setExistingProfile(created)
                setUser(await authedRequest(token => getCurrentUser(token)))
            } else {
                await authedRequest(token => updateTutorProfile(payload, token))
            }

            if (step === TOTAL_STEPS) {
                const fresh = await authedRequest(token => getMyTutorProfile(token))
                setUser(await authedRequest(token => getCurrentUser(token)))
                navigate(`/tutors/${fresh.slug}`, { replace: true })
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