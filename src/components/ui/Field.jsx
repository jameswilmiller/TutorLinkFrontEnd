export default function Field({ label, hint, error, children }) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-tl-ink mb-1">{label}</label>
            )}
            {hint && <p className="text-sm text-tl-muted mb-2">{hint}</p>}
            {children}
            {error && (
                <p role="alert" className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}
