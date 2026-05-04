function WizardStepIndicator({ steps, currentStep, onStepClick }) {
    return (
        <div className="flex items-center gap-2">
            {steps.map((label, index) => {
                const stepNum = index + 1
                const isCompleted = stepNum < currentStep
                const isCurrent = stepNum === currentStep

                return (
                    <div key={label} className="flex items-center gap-2">
                        <button
                            onClick={() => onStepClick(stepNum)}
                            className={`flex items-center gap-2 text-sm transition ${
                                isCurrent ? "text-tl-ink font-semibold" :
                                isCompleted ? "text-tl-accent cursor-pointer" :
                                "text-tl-muted cursor-default"
                            }`}
                        >
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border transition ${
                                isCurrent ? "bg-tl-accent text-white border-tl-accent" :
                                isCompleted ? "bg-tl-accent/10 text-tl-accent border-tl-accent" :
                                "bg-white text-tl-muted border-tl-border"
                            }`}>
                                {isCompleted ? "✓" : stepNum}
                            </span>
                            <span className="hidden sm:block">{label}</span>
                        </button>
                        {index < steps.length - 1 && (
                            <div className={`h-px w-8 ${isCompleted ? "bg-tl-accent" : "bg-tl-border"}`}/>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default WizardStepIndicator