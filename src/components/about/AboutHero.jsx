function AboutHero() {
    return (
        <div>
            <p className="text-sm font-semibold tracking-widest text-tl-accent uppercase mb-4">
                Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-tl-ink leading-tight">
                Built for UQ students,
                <br />
                <span className="italic">by a UQ student.</span>
            </h1>
            <div className="mt-8 space-y-4 text-tl-muted leading-relaxed">
                <p>
                    TutorLink started with a simple idea — what if University students could easily find other students who've already done their courses and are happy to help?
                    Not a replacement for lectures or tutorials, just an extra hand when you need it most.
                </p>
                <p>
                    The platform is built around UQ courses and faculties so students can search by course code and find someone familiar with exactly what they're studying.
                    It's early days — verification and reviews are coming — but the goal is simple: help students help students.
                </p>
            </div>
        </div>
    )
}

export default AboutHero