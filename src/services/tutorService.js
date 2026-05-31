import {apiGet, apiPost, apiPut, apiPostFormData} from "./apiClient"

export async function fetchTutors(filters = {}, accessToken = null) {
    const data = await apiGet("/tutors", accessToken, filters);
    return {
        tutors: data.content,
        currentPage: data.number,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
    };
}

export async function fetchTutorById(id, accessToken = null) {
    return apiGet(`/tutors/${id}`, accessToken);
}

export async function getMyTutorProfile(accessToken) {
    return apiGet("/tutors/me/profile", accessToken)
}
export async function createTutorProfile(formData, accessToken) {
    return apiPost("/tutors/me/profile", formData, accessToken)
}

export async function updateTutorProfile(formData, accessToken) {
    return apiPut("/tutors/me/profile", formData, accessToken);
}
export async function searchCourses(query) {
    return apiGet("/courses/search", null, { query });
}

export async function sendEnquiry(tutorId, formData, accessToken) {
    return apiPost(`/tutors/${tutorId}/enquire`, formData, accessToken)
}

export async function fetchTutorBySlug(slug) {
    return apiGet(`/tutors/${slug}`)
}

export async function uploadProfileImage(file, accessToken) {
    const formData = new FormData();
    formData.append("file", file);
    return apiPostFormData("/upload/profile-image", formData, accessToken);
}