import { apiGet, apiPost } from "./apiClient";

export async function createReview(formData, accessToken) {
    return apiPost("/reviews", formData, accessToken);
}

export async function getTutorReviews(tutorId) {
    return apiGet(`/reviews/tutor/${tutorId}`);
}

export async function getMyReviews(accessToken) {
    return apiGet("/reviews/me", accessToken);
}

export async function bookingHasReview(bookingId) {
    return apiGet(`/reviews/booking/${bookingId}/exists`);
}