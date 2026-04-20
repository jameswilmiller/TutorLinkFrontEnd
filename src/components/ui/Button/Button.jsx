import "./Button.css";

function Button({
    children,
    variant = "primary",
    fullWidth = false,
    type = "button",
    className ="",
    ...props
}) {
    const classes = [
        "btn",
        `btn--${variant}`,
        fullWidth ? "btn-full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}

export default Button;