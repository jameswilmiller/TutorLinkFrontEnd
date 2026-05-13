const STATS = [
    { value: "120+", label: "Courses Listed" },
    { value: "5", label: "UQ Faculties" },
    { value: "Free", label: "To Browse" },
]

function AboutStats() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {STATS.map(stat => (
                <div key={stat.label} className="bg-white border border-tl-border rounded-2xl p-6 text-center">
                    <p className="font-display text-4xl text-tl-ink">{stat.value}</p>
                    <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mt-2">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default AboutStats