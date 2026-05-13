function AuthForm({ title, subtitle, children, footer, centered = false }) {
    const alignClass = centered ? "text-center" : ""

    return (
        <div className="w-full max-w-sm">
            <h1 className={`font-display text-3xl md:text-4xl text-tl-ink mb-2 ${alignClass}`}>
                {title}
            </h1>
            {subtitle && (
                <p className={`text-tl-muted text-sm mb-8 ${alignClass}`}>
                    {subtitle}
                </p>
            )}
            {children}
            {footer && <div className="mt-6">{footer}</div>}
        </div>
    )
}

export default AuthForm