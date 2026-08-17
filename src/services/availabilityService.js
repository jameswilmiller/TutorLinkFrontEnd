import { apiGet, apiPut } from "./apiClient"

export async function getMyAvailability(accessToken) {
    return apiGet("/tutors/me/availability", accessToken)
}

export async function saveMyAvailability(rules, accessToken) {
    return apiPut("/tutors/me/availability", rules, accessToken)
}

export async function getTutorSlots(tutorId, date, durationMinutes, accessToken) {
    return apiGet(`/tutors/${tutorId}/availability/slots`, accessToken, { date, durationMinutes })
}

export async function getTutorBookableDates(tutorId, from, to, durationMinutes, accessToken) {
    return apiGet(`/tutors/${tutorId}/availability/days`, accessToken, { from, to, durationMinutes })
}
