function AboutHero() {
    return (
        <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-tl-muted uppercase mb-6">
                — Our Story
            </p>
            <h1 className="font-display text-tl-ink" style={{ fontSize: "4.5rem", lineHeight: 1.05 }}>
                Built for UQ students,{" "}
                <span className="italic">by a UQ student.</span>
            </h1>
            <p className="mt-10 text-tl-ink text-lg leading-relaxed">
                TutorLink is a side project born out of a simple idea — what if UQ students could easily find other students who've already done their courses and are happy to help? Not a replacement for lectures or tutorials, just an extra hand when you need it most.
            </p>
            <p className="mt-4 text-tl-muted text-base leading-relaxed">
                It's early days and honestly still a work in progress. But there are real tutors, real UQ courses, and a genuine hope that this makes university a little less overwhelming for someone. If you want to help others or need some help yourself — you're in the right place.
            </p>
        </div>
    )
}

export default AboutHero