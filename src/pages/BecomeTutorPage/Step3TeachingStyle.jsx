import { useEditableList } from "./useEditableList"
import Field from "../../components/ui/Field"
import TextInput from "../../components/ui/TextInput"
import WizardActions from "./WizardActions"

function Step3TeachingStyle({ formData, updateForm, onNext, onBack, saving, error, nextLabel }) {
    const styles = useEditableList(
        formData.styles,
        next => updateForm({ styles: next }),
        { label: "", description: "" }
    )

    const credentials = useEditableList(
        formData.credentials,
        next => updateForm({ credentials: next }),
        { title: "", institution: "", year: "" }
    )

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-tl-ink">Teaching styles</label>
                    <button type="button" onClick={styles.add} className="text-sm text-tl-accent hover:underline">
                        + Add style
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.styles.map((style, index) => (
                        <div key={index} className="border border-tl-border rounded-xl p-4 space-y-2">
                            <div className="flex gap-2">
                                <TextInput
                                    value={style.label}
                                    onChange={e => styles.update(index, "label", e.target.value)}
                                    placeholder="e.g. Patient"
                                />
                                <RemoveButton onClick={() => styles.remove(index)} />
                            </div>
                            <TextInput
                                value={style.description}
                                onChange={e => styles.update(index, "description", e.target.value)}
                                placeholder="e.g. No question is too small"
                            />
                        </div>
                    ))}
                    {formData.styles.length === 0 && (
                        <p className="text-sm text-tl-muted">No teaching styles added yet.</p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-tl-ink">Credentials</label>
                    <button type="button" onClick={credentials.add} className="text-sm text-tl-accent hover:underline">
                        + Add credential
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.credentials.map((cred, index) => (
                        <div key={index} className="border border-tl-border rounded-xl p-4 space-y-2">
                            <div className="flex gap-2">
                                <TextInput
                                    value={cred.title}
                                    onChange={e => credentials.update(index, "title", e.target.value)}
                                    placeholder="e.g. BSc Computer Science"
                                />
                                <RemoveButton onClick={() => credentials.remove(index)} />
                            </div>
                            <div className="flex gap-2">
                                <TextInput
                                    value={cred.institution}
                                    onChange={e => credentials.update(index, "institution", e.target.value)}
                                    placeholder="Institution"
                                />
                                <TextInput
                                    type="number"
                                    value={cred.year}
                                    onChange={e => credentials.update(index, "year", e.target.value)}
                                    placeholder="Year"
                                    className="w-24"
                                />
                            </div>
                        </div>
                    ))}
                    {formData.credentials.length === 0 && (
                        <p className="text-sm text-tl-muted">No credentials added yet.</p>
                    )}
                </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <WizardActions onNext={onNext} onBack={onBack} saving={saving} nextLabel={nextLabel} />
        </div>
    )
}

function RemoveButton({ onClick }) {
    return (
        <button type="button" onClick={onClick} className="text-tl-muted hover:text-red-500 text-sm px-2">
            ×
        </button>
    )
}

export default Step3TeachingStyle