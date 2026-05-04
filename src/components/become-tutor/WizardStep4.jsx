import ProfileImageUploader from "../become-tutor/ProfileImageUploader"
import { getTutorImage } from "../../utils/getTutorImage"

function WizardStep4({ formData, updateForm, existingProfile, onFinish, onBack, saving, error }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Profile photo</label>
                <p className="text-sm text-tl-muted mb-4">
                    Upload a clear photo of yourself. Drag to reposition your face in the circle.
                </p>
                <ProfileImageUploader
                    currentImageUrl={getTutorImage(existingProfile)}
                    onUploadComplete={key => updateForm({ profileImageKey: key })}
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition"
                >
                    Back
                </button>
                <button
                    onClick={onFinish}
                    disabled={saving}
                    className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition disabled:opacity-70"
                >
                    {saving ? "Saving..." : "Finish & View Profile"}
                </button>
            </div>
        </div>
    )
}

export default WizardStep4