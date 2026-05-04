function AuthForm({ title, subtitle, children, footer, centered = false }) {
    return (
        <div className="w-full max-w-sm">
            <h1 className={`font-display text-4xl text-tl-ink mb-2 ${centered ? "text-center" : ""}`}>
                {title}
            </h1>
            {subtitle && (
                <p className={`text-tl-muted text-sm mb-8 ${centered ? "text-center" : ""}`}>
                    {subtitle}
                </p>
            )}
            {children}
            {footer && <div className="mt-6">{footer}</div>}
        </div>
    )
}
export default AuthForm