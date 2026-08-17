import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import {getMyTutorProfile, createTutorProfile, updateTutorProfile} from "../../services/tutorService"
import {EMPTY_FORM, profileToFormData, formDataToPayload, STEP_VALIDATORS, STEP_FIELDS} from "./formData"
import { getCurrentUser } from "../../services/authService"
import { toFieldErrorMap } from "../../utils/formErrors"
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
    const [fieldErrors, setFieldErrors] = useState({})

   
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

        const touched = Object.keys(fields)
        setFieldErrors(prev => {
            if (!touched.some(key => prev[key])) return prev
            const next = { ...prev }
            touched.forEach(key => delete next[key])
            return next
        })
    }

    async function saveAndAdvance() {
        const validationError = STEP_VALIDATORS[step - 1](formData)
        if (validationError) {
            setError(validationError)
            return
        }

        setSaving(true)
        setError("")
        setFieldErrors({})
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
            if (err.fieldErrors?.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))

                const visible = STEP_FIELDS[step - 1] || []
                const offScreen = err.fieldErrors.filter(fe => !visible.includes(fe.field))

                setError(
                    offScreen.length > 0
                        ? offScreen.map(fe => fe.message).join(" ")
                        : "Please fix the highlighted fields."
                )
            } else {
                setError(err.message || "Failed to save. Please try again.")
            }
        } finally {
            setSaving(false)
        }
    }

    function goBack() {
        if (step > 1) {
            setStep(step - 1)
            setError("")
            setFieldErrors({})
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
        fieldErrors,
        updateForm,
        saveAndAdvance,
        goBack,
    }
}