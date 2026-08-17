import { useEffect, useMemo, useState } from "react"
import { DayPicker } from "react-day-picker"
import { useAuth } from "../../hooks/useAuth"
import { getTutorBookableDates } from "../../services/availabilityService"

const toISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const fromISO = iso => new Date(...iso.split("-").map((n, i) => (i === 1 ? n - 1 : Number(n))))

const CLASS_NAMES = {
    root: "relative",
    month_caption: "flex justify-center py-2 font-medium text-tl-ink text-sm",
    nav: "absolute inset-x-1 top-1 flex justify-between",
    button_previous: "p-1 rounded-lg hover:bg-tl-bg cursor-pointer text-tl-muted",
    button_next: "p-1 rounded-lg hover:bg-tl-bg cursor-pointer text-tl-muted",
    weekday: "text-[11px] font-semibold text-tl-muted uppercase pb-1",
    day: "p-0.5",
    day_button: "w-9 h-9 rounded-lg text-sm text-tl-ink hover:bg-tl-subtle transition cursor-pointer disabled:text-tl-muted/40 disabled:hover:bg-transparent disabled:cursor-not-allowed",
    selected: "[&_button]:bg-tl-accent [&_button]:text-white [&_button:hover]:bg-tl-accent-hover",
    today: "[&_button]:font-bold",
}

/**
 * Month calendar for choosing a session date. Dates the tutor cannot take are
 * disabled up front, so a student never clicks a day to find nothing there.
 * Tutors with no hours set fall back to any future date.
 */
function BookingDatePicker({ tutorId, tutorName, durationMinutes, value, onSelect }) {
    const { accessToken, authedRequest } = useAuth()
    const [month, setMonth] = useState(() => (value ? fromISO(value) : new Date()))
    const [result, setResult] = useState(null)

    const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])

    // Keying the result to its request lets loading be derived rather than set
    // inside the effect, and drops responses for a month we've navigated away from.
    const key = `${tutorId}|${durationMinutes}|${month.getFullYear()}-${month.getMonth()}`
    const info = result?.key === key ? result.info : null
    const loading = result?.key !== key
    const open = info?.hasAvailability === true

    useEffect(() => {
        if (!accessToken) return
        let cancelled = false
        const first = new Date(month.getFullYear(), month.getMonth(), 1)
        const last = new Date(month.getFullYear(), month.getMonth() + 1, 0)
        authedRequest(token => getTutorBookableDates(
            tutorId, toISO(first < today ? today : first), toISO(last), durationMinutes, token))
            .then(res => { if (!cancelled) setResult({ key, info: res }) })
            .catch(() => { if (!cancelled) setResult({ key, info: null }) })
        return () => { cancelled = true }
    }, [accessToken, authedRequest, tutorId, durationMinutes, month, today, key])

    return (
        <div className="flex flex-col items-center">
            <div className="border border-tl-border rounded-xl p-2 bg-white">
                <DayPicker
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    selected={value ? fromISO(value) : undefined}
                    onSelect={date => onSelect(date ? toISO(date) : "")}
                    disabled={open
                        ? [{ before: today }, date => !info.dates.includes(toISO(date))]
                        : [{ before: today }]}
                    startMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
                    modifiers={{ open: open ? info.dates.map(fromISO) : [] }}
                    modifiersClassNames={{ open: "tl-day-open" }}
                    classNames={CLASS_NAMES}
                />
            </div>
            <p className="text-xs text-tl-muted mt-2 text-center">
                {loading ? "Checking availability..."
                    : !open ? `${tutorName} hasn't set hours yet, so any date works.`
                    : info.dates.length ? "Highlighted days have open times this month."
                    : `${tutorName} has no open times this month — try the next one.`}
            </p>
        </div>
    )
}

export default BookingDatePicker
