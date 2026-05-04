const STATS = [
    { value: "120+", label: "Courses Listed" },
    { value: "10", label: "Tutors at Launch" },
    { value: "5", label: "UQ Faculties" },
    { value: "Free", label: "To Browse" },
]

function AboutStats() {
    return (
        <div className="bg-white rounded-2xl border border-tl-border flex divide-x divide-tl-border overflow-hidden">
            {STATS.map(stat => (
                <div key={stat.label} className="flex-1 px-8 py-10 text-center">
                    <p className="font-display text-5xl text-tl-ink">{stat.value}</p>
                    <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mt-2">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default AboutStats