function AuthInput({ name, type = "text", placeholder, value, onChange, required }) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded-xl border border-tl-border bg-white px-4 py-3 text-sm text-tl-ink outline-none focus:border-tl-accent "
        />
    )
}

export default AuthInput