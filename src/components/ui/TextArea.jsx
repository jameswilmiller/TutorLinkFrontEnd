export default function TextArea({ className = "", ...props }) {
    return (
        <textarea
            className={`w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none ${className}`}
            {...props}
        />
    )
}