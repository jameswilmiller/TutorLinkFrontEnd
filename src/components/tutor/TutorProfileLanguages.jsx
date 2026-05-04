function TutorProfileCredentials({ credentials }) {
    return (
        <div className="border border-tl-border rounded-2xl p-5 bg-white">
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-4">
                Credentials
            </p>
            <div className="space-y-3">
                {credentials.map(cred => (
                    <div key={cred.id} className="flex justify-between text-sm">
                        <span className="text-tl-ink">{cred.title}</span>
                        <span className="text-tl-muted text-right ml-4">
                            {cred.institution}{cred.year ? `, ${cred.year}` : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TutorProfileCredentials