const STATS = [
    { value: "120+", label: "Courses Listed" },
    { value: "5", label: "UQ Faculties" },
    { value: "Free", label: "To Browse" },
]

function HomeStats() {
    return (
        <div className="bg-tl-accent w-full">
            <div className="max-w-4xl mx-auto flex divide-x divide-white/20 py-2">
                {STATS.map(stat => (
                    <div key={stat.label} className="flex-1 text-center">
                        <p className="font-display text-4xl text-white">{stat.value}</p>
                        <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mt-2">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeStats