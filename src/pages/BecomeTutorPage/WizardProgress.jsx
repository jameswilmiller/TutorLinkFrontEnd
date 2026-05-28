const STEP_LABELS = ["Basic Info", "Courses", "Teaching Style", "Photo"]

export default function WizardProgress({ currentStep, totalSteps = 4 }) {
    return (
        <div className="flex items-center gap-2">
            {STEP_LABELS.slice(0, totalSteps).map((label, index) => {
                const stepNum = index + 1
                const isCompleted = stepNum < currentStep
                const isCurrent = stepNum === currentStep

                return (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 text-sm ${
                            isCurrent ? "text-tl-ink font-semibold" :
                            isCompleted ? "text-tl-accent" :
                            "text-tl-muted"
                        }`}>
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                                isCurrent ? "bg-tl-accent text-white border-tl-accent" :
                                isCompleted ? "bg-tl-accent/10 text-tl-accent border-tl-accent" :
                                "bg-white text-tl-muted border-tl-border"
                            }`}>
                                {isCompleted ? "✓" : stepNum}
                            </span>
                            <span className="hidden sm:block">{label}</span>
                        </div>
                        {index < totalSteps - 1 && (
                            <div className={`h-px w-8 ${isCompleted ? "bg-tl-accent" : "bg-tl-border"}`} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}