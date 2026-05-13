const VALUES = [
    {
        number: "01",
        title: "Peer knowledge is powerful",
        description: "A peer who's just done a course often knows exactly which concepts trip people up and how to explain them. That perspective is hard to replicate."
    },
    {
        number: "02",
        title: "Tutoring should be accessible",
        description: "Tutors set their own rates, and the platform is free to browse. No subscriptions, no minimum commitments."
    },
    {
        number: "03",
        title: "Simple is better",
        description: "Find a tutor, send a request, get in touch. Bookings are arranged directly between students — no middleman."
    },
]

function AboutValues() {
    return (
        <section>
            <h2 className="font-display text-2xl md:text-3xl text-tl-ink mb-8">What we believe</h2>
            <div className="space-y-6">
                {VALUES.map(value => (
                    <div
                        key={value.number}
                        className="flex gap-6 pb-6 border-b border-tl-border last:border-b-0 last:pb-0"
                    >
                        <p className="font-display text-3xl text-tl-border shrink-0">{value.number}</p>
                        <div>
                            <h3 className="font-semibold text-tl-ink">{value.title}</h3>
                            <p className="text-sm text-tl-muted mt-1 leading-relaxed">{value.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AboutValues