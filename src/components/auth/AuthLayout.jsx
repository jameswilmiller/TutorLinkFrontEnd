function AuthLayout({ left, right }) {
    return (
        <div className="flex min-h-screen">
            {/* Left panel */}
            <div className="hidden lg:flex w-1/2 bg-tl-accent flex-col justify-between p-16">
                <p className="font-display text-white text-lg">Join TutorLink</p>
                {left}
                <div/>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center px-8 py-16 bg-tl-bg">
                {right}
            </div>
        </div>
    )
}

export default AuthLayout