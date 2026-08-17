import { useId } from "react"

function AuthInput({ name, type = "text", label, placeholder, value, onChange, required, error, autoComplete }) {
    const id = useId()
    const errorId = `${id}-error`

    return (
        <div>
            <label htmlFor={id} className="sr-only">{label || placeholder}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-base md:text-sm text-tl-ink outline-none transition ${
                    error
                        ? "border-red-400 focus:border-red-500"
                        : "border-tl-border focus:border-tl-accent"
                }`}
            />
            {error && (
                <p id={errorId} className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

export default AuthInput
