import Button from "../../components/ui/Button"

export default function WizardActions({ onNext, onBack, saving, nextLabel = "Save & Continue" }) {
    return (
        <div className="flex gap-3 pt-4">
            {onBack && (
                <Button variant="secondary" size="lg" onClick={onBack} className="flex-1">
                    Back
                </Button>
            )}
            <Button size="lg" onClick={onNext} disabled={saving} className="flex-1">
                {saving ? "Saving..." : nextLabel}
            </Button>
        </div>
    )
}