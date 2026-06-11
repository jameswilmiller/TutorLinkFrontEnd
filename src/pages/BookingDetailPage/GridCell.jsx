function GridCell({ label, value }) {
    return (
        <div>
            <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">
                {label}
            </p>
            <p className="text-tl-ink mt-1">{value}</p>
        </div>
    )
}
export default GridCell