function DashboardComingSoon({ feature }) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20">
            <p className="text-5xl mb-4">🚧</p>
            <h2 className="font-display text-3xl text-tl-ink mb-2">{feature}</h2>
            <p className="text-tl-muted">This feature is coming soon.</p>
        </div>
    )
}

export default DashboardComingSoon