import { apiGet, apiPost, apiRequest } from "./apiClient";

export async function createBooking(formData, accessToken) {
    return apiPost("/bookings", formData, accessToken);
}

export async function getStudentBookings(accessToken) {
    return apiGet("/bookings/me/student", accessToken);
}

export async function getTutorBookings(accessToken) {
    return apiGet("/bookings/me/tutor", accessToken);
}

export async function getBookingById(id, accessToken) {
    return apiGet(`/bookings/${id}`, accessToken);
}

export async function acceptBooking(id, accessToken) {
    return apiPost(`/bookings/${id}/accept`, null, accessToken);
}

export async function declineBooking(id, accessToken) {
    return apiPost(`/bookings/${id}/decline`, null, accessToken);
}

export async function cancelBooking(id, accessToken) {
    return apiPost(`/bookings/${id}/cancel`, null, accessToken);
}

export async function completeBooking(id, accessToken) {
    return apiPost(`/bookings/${id}/complete`, null, accessToken);
}

export async function updateMeetingLink(id, meetingLink, accessToken) {
    return apiRequest(
        `/bookings/${id}/meeting-link`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ meetingLink }),
        },
        accessToken
    );
}

export async function updateMeetingLocation(id, meetingLocation, accessToken) {
    return apiRequest(
        `/bookings/${id}/meeting-location`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ meetingLocation }),
        },
        accessToken
    );
}