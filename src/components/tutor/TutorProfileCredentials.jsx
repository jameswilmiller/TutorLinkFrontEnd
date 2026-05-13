function TutorProfileCredentials({ credentials }) {
    return (
        <section className="bg-white border border-tl-border rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Credentials
            </p>
            <div className="space-y-3">
                {credentials.map(cred => (
                    <div key={cred.id} className="flex justify-between text-sm gap-4">
                        <span className="text-tl-ink">{cred.title}</span>
                        <span className="text-tl-muted text-right">
                            {cred.institution}{cred.year ? `, ${cred.year}` : ""}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TutorProfileCredentials