function calculateCompleteness(tutor) {
    const checks = [
        { label: "Profile photo", done: !!tutor.profileImageKey },
        { label: "About section", done: !!tutor.bio?.trim() },
        { label: "Teaching style", done: tutor.styles?.length > 0 },
        { label: "Credentials", done: tutor.credentials?.length > 0 },
        { label: "Rate set", done: !!tutor.hourlyRate },
        { label: "Availability set", done: false },
    ]
    const completed = checks.filter(c => c.done).length
    const percentage = Math.round((completed / checks.length) * 100)
    return { checks, percentage }
}

function DashboardOverview({ tutor }) {
    const { checks, percentage } = calculateCompleteness(tutor)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-tl-border rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="font-semibold text-tl-ink text-lg">Profile completeness</h2>
                        <p className="text-sm text-tl-muted mt-1">A complete profile will increase student bookings</p>
                    </div>
                    <p className="font-display text-4xl text-tl-ink">{percentage}<span className="text-2xl">%</span></p>
                </div>

                <div className="h-2 bg-tl-border rounded-full overflow-hidden">
                    <div
                        className="h-full bg-tl-accent transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                    {checks.map(check => (
                        <span
                            key={check.label}
                            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 ${
                                check.done
                                    ? "bg-tl-subtle text-tl-ink"
                                    : "bg-tl-bg text-tl-muted"
                            }`}
                        >
                            <span>{check.done ? "✓" : "○"}</span>
                            {check.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-tl-border rounded-2xl p-6">
                    
                    <p className="font-display text-5xl text-tl-ink">—</p>
                    <p className="font-semibold text-tl-ink mt-3">Profile views</p>
                    <p className="text-sm text-tl-muted">this month</p>
                </div>

                <div className="bg-white border border-tl-border rounded-2xl p-6">
                    
                    <p className="font-display text-5xl text-tl-ink">—</p>
                    <p className="font-semibold text-tl-ink mt-3">Booking requests</p>
                    <p className="text-sm text-tl-muted">pending reply</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview