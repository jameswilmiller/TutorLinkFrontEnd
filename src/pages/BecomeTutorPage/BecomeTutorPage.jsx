import { useAuth } from "../../hooks/useAuth"
import { useTutorOnboarding } from "./useTutorOnboarding"
import LoadingState from "../../components/ui/LoadingState"
import WizardProgress from "./WizardProgress"
import Step1BasicInfo from "./Step1BasicInfo"
import Step2Courses from "./Step2Courses"
import Step3TeachingStyle from "./Step3TeachingStyle"
import Step4Photo from "./Step4Photo"

const STEP_COMPONENTS = [Step1BasicInfo, Step2Courses, Step3TeachingStyle, Step4Photo]

function BecomeTutorPage() {
    const { accessToken } = useAuth()
    const wizard = useTutorOnboarding(accessToken)

    if (wizard.loading) return <LoadingState />

    const CurrentStep = STEP_COMPONENTS[wizard.step - 1]
    const isLast = wizard.step === wizard.totalSteps

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl text-tl-ink mb-2">Become a tutor</h1>
            <p className="text-tl-muted mb-8">Set up your profile so students can find you.</p>

            <WizardProgress currentStep={wizard.step} totalSteps={wizard.totalSteps} />

            <div className="mt-10">
                <CurrentStep
                    formData={wizard.formData}
                    updateForm={wizard.updateForm}
                    existingProfile={wizard.existingProfile}
                    onNext={wizard.saveAndAdvance}
                    onBack={wizard.step > 1 ? wizard.goBack : undefined}
                    saving={wizard.saving}
                    error={wizard.error}
                    nextLabel={isLast ? "Finish & View Profile" : "Save & Continue"}
                />
            </div>
        </div>
    )
}

export default BecomeTutorPage


