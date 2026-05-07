function TutorProfileAbout({ tutor }) {
    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                About
            </p>
            <p className="text-tl-ink leading-relaxed">
                {tutor.bio || "No bio provided."}
            </p>
        </div>
    )
}

export default TutorProfileAbout