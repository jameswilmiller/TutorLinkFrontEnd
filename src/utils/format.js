export function formatDate(value) {
    if (!value) return ""
    return new Date(value).toLocaleDateString(undefined, {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
    })
}

export function formatTime(value) {
    if (!value) return ""
    return new Date(value).toLocaleTimeString(undefined, {
        hour: "numeric", minute: "2-digit",
    })
}

export function initials(name) {
    if (!name) return "?"
    return name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase()
}