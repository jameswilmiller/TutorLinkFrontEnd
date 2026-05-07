function TutorProfileStyles({ styles }) {
    return (
        <div className="bg-white border border-tl-border rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Teaching Style
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {styles.map(style => (
                    <div key={style.id} className="border border-tl-border rounded-xl p-3 bg-tl-bg">
                        <p className="font-semibold text-tl-ink text-sm">{style.label}</p>
                        <p className="text-xs text-tl-muted mt-1">{style.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TutorProfileStyles