export default function Field({ label, hint, error, htmlFor, children }) {
    const labelClass = "block text-sm font-medium text-tl-ink mb-1"

    return (
        <div>
            {label && (
                htmlFor
                    ? <label htmlFor={htmlFor} className={labelClass}>{label}</label>
                    : <p className={labelClass}>{label}</p>
            )}
            {hint && <p className="text-sm text-tl-muted mb-2">{hint}</p>}
            {children}
            {error && (
                <p role="alert" className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}
