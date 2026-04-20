import {apiGet, apiPost, apiPut, apiPostFormData} from "./apiClient"

export async function fetchTutors(accessToken = null) {
    return apiGet("/tutors", accessToken);
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

export async function searchTutors(filters, accessToken = null) {
    return apiPost("/tutors/search", filters, accessToken)

}
export async function updateTutorProfile(formData, accessToken) {
    return apiPut("/tutors/me/profile", formData, accessToken);
}
export async function uploadProfileImage(file, accessToken) {
    const formData = new FormData();
    formData.append("file", file);
    return apiPostFormData("/upload/profile-image", formData, accessToken);
}