import PlacesAutoComplete from "../../components/search/PlacesAutoComplete"
import Field from "../../components/ui/Field"
import TextInput from "../../components/ui/TextInput"
import TextArea from "../../components/ui/TextArea"
import WizardActions from "./WizardActions"

function Step1BasicInfo({ formData, updateForm, onNext, saving, error, fieldErrors = {}, nextLabel }) {
    return (
        <div className="space-y-6">
            <Field label="Bio *" htmlFor="tutor-bio" error={fieldErrors.bio}>
                <TextArea
                    id="tutor-bio"
                    value={formData.bio}
                    onChange={e => updateForm({ bio: e.target.value })}
                    placeholder="Tell students about yourself, your experience, and your teaching approach..."
                    rows={5}
                    aria-invalid={!!fieldErrors.bio}
                />
            </Field>

            <Field label="Tagline" htmlFor="tutor-tagline" error={fieldErrors.tagline}>
                <TextInput
                    id="tutor-tagline"
                    value={formData.tagline}
                    onChange={e => updateForm({ tagline: e.target.value })}
                    placeholder="e.g. Patient, structured, and obsessed with the moment it clicks."
                    aria-invalid={!!fieldErrors.tagline}
                />
            </Field>

            <Field label="Hourly rate ($) *" htmlFor="tutor-rate" error={fieldErrors.hourlyRate}>
                <TextInput
                    id="tutor-rate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={e => updateForm({ hourlyRate: e.target.value })}
                    placeholder="e.g. 50"
                    min={0}
                    aria-invalid={!!fieldErrors.hourlyRate}
                />
            </Field>

            <Field label="Location" htmlFor="tutor-location" error={fieldErrors.location}>
                <div className="border border-tl-border rounded-xl px-4 py-3">
                    <PlacesAutoComplete
                        inputId="tutor-location"
                        onPlaceSelect={place => updateForm({
                            location: place.locationName,
                            latitude: place.latitude,
                            longitude: place.longitude,
                        })}
                        initialValue={formData.location}
                    />
                </div>
            </Field>

            <Field label="Lesson mode" hint="Leave unchecked if you only teach in-person.">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.remote}
                        onChange={e => updateForm({ remote: e.target.checked })}
                        className="accent-tl-accent"
                    />
                    <span className="text-sm text-tl-ink">I also teach online</span>
                </label>
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <WizardActions onNext={onNext} saving={saving} nextLabel={nextLabel} />
        </div>
    )
}

export default Step1BasicInfo