export default function TextInput({ className = "", ...props }) {
    return (
        <input
            className={`w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent ${className}`}
            {...props}
        />
    )
}