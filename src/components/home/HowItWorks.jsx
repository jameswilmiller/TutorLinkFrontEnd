const STEPS = [
    {
        number: "01",
        title: "Search your course",
        description: "Enter a course code or subject. Find tutors who've aced the exact same unit."
    },
    {
        number: "02",
        title: "View their profile",
        description: "Check their courses, teaching style, rate and credentials. Message them first if you have questions."
    },
    {
        number: "03",
        title: "Book a session",
        description: "Send a booking request. You'll get a confirmation email and the tutor will be in touch to confirm."
    }
]

function HowItWorks() {
    return (
        <div className="bg-white">
            <div className="max-w-350 mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold tracking-widest text-tl-label uppercase mb-3">
                        How It Works
                    </p>
                    <h2 className="font-display text-4xl text-tl-ink">Find help in three steps</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {STEPS.map(step => (
                        <div key={step.number}>
                            <p className="font-display text-6xl text-tl-border">{step.number}</p>
                            <h3 className="font-semibold text-tl-ink text-lg mt-2">{step.title}</h3>
                            <p className="text-sm text-tl-muted mt-2 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowItWorks