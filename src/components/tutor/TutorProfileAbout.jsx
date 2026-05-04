function TutorProfileAbout({ tutor }) {
    return (
        <div>
            <h2 className="font-display text-2xl text-tl-ink mb-3">About</h2>
            <p className="text-tl-ink leading-relaxed">
                {tutor.bio || "No bio provided."}
            </p>
        </div>
    )
}

export default TutorProfileAbout