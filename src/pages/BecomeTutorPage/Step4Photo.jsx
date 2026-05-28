import ProfileImageUploader from "../../components/common/ProfileImageUploader"
import { getTutorImage } from "../../utils/getTutorImage"
import Field from "../../components/ui/Field"
import WizardActions from "./WizardActions"

function Step4Photo({ formData, updateForm, existingProfile, onNext, onBack, saving, error, nextLabel }) {
    return (
        <div className="space-y-6">
            <Field
                label="Profile photo *"
                hint="Upload a clear photo of yourself. Drag to reposition your face in the circle."
            >
                <ProfileImageUploader
                    currentImageUrl={getTutorImage(existingProfile)}
                    onUploadComplete={key => updateForm({ profileImageKey: key })}
                />
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <WizardActions onNext={onNext} onBack={onBack} saving={saving} nextLabel={nextLabel} />
        </div>
    )
}

export default Step4Photo