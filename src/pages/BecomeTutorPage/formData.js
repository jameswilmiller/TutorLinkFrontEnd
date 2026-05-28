export const EMPTY_FORM = {
    bio: "",
    tagline: "",
    hourlyRate: "",
    location: "",
    latitude: null,
    longitude: null,
    remote: false,
    courses: [],
    faculties: [],
    styles: [],
    credentials: [],
    languages: [],
    profileImageKey: "",
}

export function profileToFormData(profile) {
    return {
        bio: profile.bio || "",
        tagline: profile.tagline || "",
        hourlyRate: profile.hourlyRate || "",
        location: profile.location || "",
        latitude: profile.latitude || null,
        longitude: profile.longitude || null,
        remote: profile.remote || false,
        courses: profile.courses || [],
        faculties: profile.faculties || [],
        styles: profile.styles?.map(s => ({ label: s.label, description: s.description })) || [],
        credentials: profile.credentials?.map(c => ({ title: c.title, institution: c.institution, year: c.year })) || [],
        languages: profile.languages?.map(l => ({ language: l.language, level: l.level })) || [],
        profileImageKey: profile.profileImageKey || "",
    }
}

export function formDataToPayload(formData) {
    return {
        ...formData,
        courseIds: formData.courses.map(c => c.id),
    }
}


export function validateStep1(formData) {
    if (!formData.bio.trim()) return "Please add a bio."
    if (!formData.hourlyRate || Number(formData.hourlyRate) <= 0) return "Please set an hourly rate."
    return null
}

export function validateStep2(formData) {
    if (formData.courses.length === 0) return "Please add at least one course."
    return null
}

export function validateStep3() {
    return null  
}

export function validateStep4(formData) {
    if (!formData.profileImageKey) return "Please upload a profile photo."
    return null
}

export const STEP_VALIDATORS = [validateStep1, validateStep2, validateStep3, validateStep4]