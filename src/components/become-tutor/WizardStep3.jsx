function WizardStep3({ formData, updateForm, onNext, onBack, saving, error }) {
    function addStyle() {
        updateForm({ styles: [...formData.styles, { label: "", description: "" }] })
    }

    function updateStyle(index, field, value) {
        const updated = formData.styles.map((s, i) => i === index ? { ...s, [field]: value } : s)
        updateForm({ styles: updated })
    }

    function removeStyle(index) {
        updateForm({ styles: formData.styles.filter((_, i) => i !== index) })
    }

    function addCredential() {
        updateForm({ credentials: [...formData.credentials, { title: "", institution: "", year: "" }] })
    }

    function updateCredential(index, field, value) {
        const updated = formData.credentials.map((c, i) => i === index ? { ...c, [field]: value } : c)
        updateForm({ credentials: updated })
    }

    function removeCredential(index) {
        updateForm({ credentials: formData.credentials.filter((_, i) => i !== index) })
    }

    return (
        <div className="space-y-8">
            {/* Teaching styles */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-tl-ink">Teaching styles</label>
                    <button onClick={addStyle} className="text-sm text-tl-accent hover:underline">+ Add style</button>
                </div>
                <div className="space-y-3">
                    {formData.styles.map((style, index) => (
                        <div key={index} className="border border-tl-border rounded-xl p-4 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={style.label}
                                    onChange={e => updateStyle(index, "label", e.target.value)}
                                    placeholder="e.g. Patient"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <button onClick={() => removeStyle(index)} className="text-tl-muted hover:text-red-500 text-sm px-2">×</button>
                            </div>
                            <input
                                type="text"
                                value={style.description}
                                onChange={e => updateStyle(index, "description", e.target.value)}
                                placeholder="e.g. No question is too small"
                                className="w-full border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                            />
                        </div>
                    ))}
                    {formData.styles.length === 0 && (
                        <p className="text-sm text-tl-muted">No teaching styles added yet.</p>
                    )}
                </div>
            </div>

            {/* Credentials */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-tl-ink">Credentials</label>
                    <button onClick={addCredential} className="text-sm text-tl-accent hover:underline">+ Add credential</button>
                </div>
                <div className="space-y-3">
                    {formData.credentials.map((cred, index) => (
                        <div key={index} className="border border-tl-border rounded-xl p-4 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={cred.title}
                                    onChange={e => updateCredential(index, "title", e.target.value)}
                                    placeholder="e.g. BSc Computer Science"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <button onClick={() => removeCredential(index)} className="text-tl-muted hover:text-red-500 text-sm px-2">×</button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={cred.institution}
                                    onChange={e => updateCredential(index, "institution", e.target.value)}
                                    placeholder="Institution"
                                    className="flex-1 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
                                />
                                <input
                                    type="number"
                                    value={cred.year}
                                    onChange={e => updateCredential(index, "year", e.target.value)}
                                    placeholder="Year"
                                    className="w-24 border border-tl-border rounded-lg px-3 py-2 text-sm outline-none focus:border-tl-accent"
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

            <div className="flex gap-3">
                <button onClick={onBack} className="flex-1 border border-tl-border text-tl-ink py-3 rounded-xl hover:bg-tl-bg transition">
                    Back
                </button>
                <button onClick={onNext} disabled={saving} className="flex-1 bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition disabled:opacity-70">
                    {saving ? "Saving..." : "Save & Continue"}
                </button>
            </div>
        </div>
    )
}

export default WizardStep3