function AuthInput({ name, type = "text", placeholder, value, onChange, required, error, autoComplete }) {
    return (
        <div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-tl-ink outline-none transition ${
                    error
                        ? "border-red-400 focus:border-red-500"
                        : "border-tl-border focus:border-tl-accent"
                }`}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

export default AuthInput