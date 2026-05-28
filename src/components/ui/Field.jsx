export default function Field({ label, hint, children }) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-tl-ink mb-1">{label}</label>
            )}
            {hint && <p className="text-sm text-tl-muted mb-2">{hint}</p>}
            {children}
        </div>
    )
}