import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getMyAvailability, saveMyAvailability } from "../../services/availabilityService"
import LoadingState from "../ui/LoadingState"

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
const DAY_START = 6 * 60
const STEP = 30
const SLOT_H = 15
const ROWS = (22 * 60 - DAY_START) / STEP

const short = day => day.slice(0, 1) + day.slice(1, 3).toLowerCase()

function label(mins) {
    const h = Math.floor(mins / 60), m = mins % 60
    return `${h % 12 === 0 ? 12 : h % 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`
}

const toTime = mins => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`
const toMins = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))

/** Sorts, then merges windows that overlap or touch, so blocks never show seams. */
function merge(windows) {
    return [...windows].sort((a, b) => a.start - b.start).reduce((out, w) => {
        const last = out[out.length - 1]
        if (last && w.start <= last.end) last.end = Math.max(last.end, w.end)
        else out.push({ ...w })
        return out
    }, [])
}

function DashboardAvailability() {
    const { accessToken, authedRequest } = useAuth()
    const [week, setWeek] = useState(() => Object.fromEntries(DAYS.map(d => [d, []])))
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [status, setStatus] = useState(null)
    const [drag, setDrag] = useState(null)
    // Mirrored in a ref: state alone lags a frame behind, so a quick
    // click can land its pointerup before the drag has been recorded.
    const dragRef = useRef(null)

    useEffect(() => {
        if (!accessToken) return
        let cancelled = false
        authedRequest(token => getMyAvailability(token))
            .then(rules => {
                if (cancelled) return
                const next = Object.fromEntries(DAYS.map(d => [d, []]))
                rules.forEach(r => next[r.dayOfWeek].push({ start: toMins(r.startTime), end: toMins(r.endTime) }))
                DAYS.forEach(d => { next[d] = merge(next[d]) })
                setWeek(next)
            })
            .catch(err => { if (!cancelled) setStatus({ error: err.message || "Failed to load availability" }) })
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [accessToken, authedRequest])

    function edit(day, windows) {
        setWeek(prev => ({ ...prev, [day]: windows }))
        setStatus(null)
    }

    const rowAt = e => {
        const { top } = e.currentTarget.getBoundingClientRect()
        return Math.max(0, Math.min(ROWS - 1, Math.floor((e.clientY - top) / SLOT_H)))
    }

    function startDrag(e, day) {
        if (e.button !== 0) return
        e.preventDefault()
        // Pointer capture keeps move/up on this column even if the cursor
        // leaves it, so no window-level listener is needed.
        try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* no live pointer */ }
        dragRef.current = { day, from: rowAt(e), to: rowAt(e) }
        setDrag(dragRef.current)
    }

    function moveDrag(e, day) {
        const d = dragRef.current
        if (!d || d.day !== day) return
        const to = rowAt(e)
        if (to === d.to) return
        dragRef.current = { ...d, to }
        setDrag(dragRef.current)
    }

    function endDrag() {
        const d = dragRef.current
        dragRef.current = null
        setDrag(null)
        if (!d) return
        const [lo, hi] = [Math.min(d.from, d.to), Math.max(d.from, d.to)]
        edit(d.day, merge([...week[d.day], {
            start: DAY_START + lo * STEP,
            end: DAY_START + (hi + 1) * STEP,
        }]))
    }

    async function save() {
        setSaving(true)
        setStatus(null)
        try {
            await authedRequest(token => saveMyAvailability(
                DAYS.flatMap(d => week[d].map(w => ({
                    dayOfWeek: d, startTime: toTime(w.start), endTime: toTime(w.end),
                }))), token))
            setStatus({ saved: true })
        } catch (err) {
            setStatus({ error: err.message || "Failed to save availability" })
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <LoadingState message="Loading your availability..." />

    const hours = DAYS.reduce((n, d) => n + week[d].reduce((m, w) => m + w.end - w.start, 0), 0) / 60

    return (
        <div className="max-w-4xl mx-auto bg-white border border-tl-border rounded-2xl overflow-hidden">
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-tl-border">
                <div>
                    <h2 className="font-semibold text-tl-ink text-lg">Weekly hours</h2>
                    <p className="text-sm text-tl-muted mt-1">
                        Drag on the calendar to add hours. Students can only request sessions inside them.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-tl-muted tabular-nums">
                        {hours > 0 ? `${hours} hrs / week` : "None set"}
                    </span>
                    <button
                        onClick={save}
                        disabled={saving}
                        className="bg-tl-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <div className="min-w-[620px]">
                <div className="flex mb-2">
                    <div className="w-14 shrink-0" />
                    {DAYS.map(day => (
                        <div key={day} className="flex-1 text-center">
                            <p className={`text-xs font-semibold ${week[day].length ? "text-tl-ink" : "text-tl-muted"}`}>
                                {short(day)}
                            </p>
                            {week[day].length > 0 && (
                                <button onClick={() => edit(day, [])}
                                        className="text-[10px] text-tl-muted hover:text-red-500 cursor-pointer">
                                    clear
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex" style={{ touchAction: "none" }}>
                    <div className="w-14 shrink-0 relative" style={{ height: ROWS * SLOT_H }}>
                        {Array.from({ length: ROWS / 2 + 1 }, (_, i) => (
                            <span key={i} className="absolute right-2 text-[11px] text-tl-muted -translate-y-1/2"
                                  style={{ top: i * 2 * SLOT_H }}>
                                {label(DAY_START + i * 60)}
                            </span>
                        ))}
                    </div>

                    <div className="flex-1 flex">
                        {DAYS.map((day, di) => (
                            <div key={day} className="flex-1 flex">
                                <div
                                    onPointerDown={e => startDrag(e, day)}
                                    onPointerMove={e => moveDrag(e, day)}
                                    onPointerUp={endDrag}
                                    className={`relative flex-1 cursor-crosshair border-tl-border ${di ? "border-l" : "border-l"} ${
                                        di === DAYS.length - 1 ? "border-r" : ""
                                    } border-y ${di > 4 ? "bg-tl-bg/50" : "bg-white"} ${
                                        di === 0 ? "rounded-l-xl" : ""} ${di === DAYS.length - 1 ? "rounded-r-xl" : ""}`}
                                    style={{ height: ROWS * SLOT_H }}
                                >
                                    {Array.from({ length: ROWS / 2 }, (_, i) => (
                                        <div key={i} className="absolute inset-x-0 border-t border-tl-border/50 pointer-events-none"
                                             style={{ top: i * 2 * SLOT_H }} />
                                    ))}

                                    {week[day].map((w, i) => (
                                        <div key={i}
                                             className="absolute inset-x-1 rounded-lg bg-tl-accent text-white shadow-sm overflow-hidden group"
                                             style={{ top: ((w.start - DAY_START) / STEP) * SLOT_H,
                                                      height: ((w.end - w.start) / STEP) * SLOT_H - 2 }}>
                                            <p className="text-[10px] leading-tight px-1.5 pt-1 font-medium">{label(w.start)}</p>
                                            <p className="text-[10px] leading-tight px-1.5 opacity-80">{label(w.end)}</p>
                                            <button
                                                aria-label={`Remove ${short(day)} ${label(w.start)} to ${label(w.end)}`}
                                                onPointerDown={e => e.stopPropagation()}
                                                onClick={() => edit(day, week[day].filter((_, j) => j !== i))}
                                                className="absolute top-0.5 right-0.5 w-4 h-4 rounded flex items-center justify-center text-white/70 hover:text-white hover:bg-black/20 opacity-0 group-hover:opacity-100 cursor-pointer text-xs"
                                            >×</button>
                                        </div>
                                    ))}

                                    {drag?.day === day && (
                                        <div className="absolute inset-x-1 rounded-lg bg-tl-accent/50 border border-tl-accent pointer-events-none"
                                             style={{ top: Math.min(drag.from, drag.to) * SLOT_H,
                                                      height: (Math.abs(drag.to - drag.from) + 1) * SLOT_H - 2 }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex mt-2">
                    <div className="w-14 shrink-0" />
                    {DAYS.map((day, di) => (
                        <div key={day} className="flex-1 text-center">
                            {week[day].length > 0 && di < 5 && (
                                <button
                                    title={`Copy ${short(day)} to Monday–Friday`}
                                    onClick={() => setWeek(prev => ({
                                        ...prev,
                                        ...Object.fromEntries(DAYS.slice(0, 5).map(d => [d, prev[day].map(w => ({ ...w }))])),
                                    }))}
                                    className="text-[10px] text-tl-muted hover:text-tl-accent cursor-pointer"
                                >
                                    copy to weekdays
                                </button>
                            )}
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {status && (
                <p role={status.error ? "alert" : "status"}
                   className={`px-6 pb-5 text-sm ${status.error ? "text-red-500" : "text-green-600"}`}>
                    {status.error || "Availability saved."}
                </p>
            )}
        </div>
    )
}

export default DashboardAvailability
