/* booking details utils */

/**
 * 
 * @param {*} booking 
 * @param {*} isTutor 
 * 
 * @returns {{name: string, email: string, firstName: string}}
 */

export function getOtherParty(booking, isTutor) {
    const name = isTutor ? booking.studentName : booking.tutorName
    const email = isTutor ? booking.studentEmail : booking.tutorEmail
    const firstName = name ? name.split(" ")[0] : ""

    return {name, email, firstName}
}

export function getEarnings(booking) {
    const hours = (booking.durationMinutes || 0) / 60
    const earnings = booking.tutorHourlyRate != null ? booking.tutorHourlyRate * hours : null

    return earnings
}

/*my bookings page utils */
const CANCELLED_STATUSES = ["CANCELLED", "DECLINED"]

export function isTutor(user) {
    return !!user?.roles?.includes("TUTOR")
}

export const TAB_STATUSES = {
    upcoming: ["PENDING", "ACCEPTED"],
    past: ["COMPLETED"],
    cancelled: ["CANCELLED", "DECLINED"],
}
 

export function filterByTab(bookings, tabId) {
    return bookings.filter(b => TAB_STATUSES[tabId].includes(b.status))
}