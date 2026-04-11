import { apiGet, apiPost} from "./apiClient";

export async function signupUser(formData) {
    return apiPost("/auth/signup", formData)
}

export async function loginUser(formData) {
    return apiPost("/auth/login", formData)
}

export async function refreshAccessToken() {
    return apiPost("/auth/refresh");
}

export async function logoutUser() {
    return apiPost("/auth/logout");
}

export async function getCurrentUser(accessToken) {
    return apiGet("/users/me", accessToken);
}

export async function verifyUser(formData) {
    return apiPost("/auth/verify", formData);
}

export async function resendVerificationCode(email) {
    return apiPost(`/auth/resend?email=${encodeURIComponent(email)}`);
}