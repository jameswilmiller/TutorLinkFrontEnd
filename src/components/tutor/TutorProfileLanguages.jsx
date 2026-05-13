function TutorProfileLanguages({ languages }) {
    return (
        <section className="bg-white border border-tl-border rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Languages
            </p>
            <div className="flex flex-wrap gap-2">
                {languages.map(language => (
                    <div
                        key={language.id ?? language.name ?? language}
                        className="flex items-center gap-2 border border-tl-border rounded-full px-3 py-1.5 text-sm bg-tl-bg"
                    >
                        <span className="text-tl-ink font-medium">
                            {language.name ?? language}
                        </span>
                        {language.proficiency && (
                            <span className="text-tl-muted text-xs">
                                · {language.proficiency}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TutorProfileLanguages