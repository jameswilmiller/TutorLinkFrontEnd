function TutorProfileStyles({ styles }) {
    return (
        <div>
            <h2 className="font-display text-2xl text-tl-ink mb-3">Teaching style</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {styles.map(style => (
                    <div key={style.id} className="border border-tl-border rounded-xl p-4 bg-white">
                        <p className="font-semibold text-tl-ink">{style.label}</p>
                        <p className="text-sm text-tl-muted mt-1">{style.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TutorProfileStyles