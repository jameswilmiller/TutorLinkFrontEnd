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
export function isTutor(user) {
    return user.roles.includes("TUTOR")
}
export function isUpcoming(booking) {
    return
}

export function isPast(booking) {
    return
}

export function isCancelled(booking) {
    return 
}