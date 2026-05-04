import PlacesAutoComplete from "../search/PlacesAutoComplete"

function WizardStep1({ formData, updateForm, onNext, saving, error }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Tagline</label>
                <input
                    type="text"
                    value={formData.tagline}
                    onChange={e => updateForm({ tagline: e.target.value })}
                    placeholder="e.g. Patient, structured, and obsessed with the moment it clicks."
                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={e => updateForm({ bio: e.target.value })}
                    placeholder="Tell students about yourself, your experience, and your teaching approach..."
                    rows={5}
                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Hourly rate ($)</label>
                <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={e => updateForm({ hourlyRate: e.target.value })}
                    placeholder="e.g. 50"
                    min={0}
                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-tl-ink mb-1">Location</label>
                <div className="border border-tl-border rounded-xl px-4 py-3">
                    <PlacesAutoComplete
                        onPlaceSelect={place => updateForm({
                            location: place.locationName,
                            latitude: place.latitude,
                            longitude: place.longitude,
                        })}
                        initialValue={formData.location}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-tl-ink mb-2">Lesson mode</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.remote}
                            onChange={e => updateForm({ remote: e.target.checked })}
                            className="accent-tl-accent"
                        />
                        <span className="text-sm text-tl-ink">Online</span>
                    </label>
                </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
                onClick={onNext}
                disabled={saving}
                className="w-full bg-tl-accent text-white py-3 rounded-xl hover:bg-tl-accent-hover transition disabled:opacity-70"
            >
                {saving ? "Saving..." : "Save & Continue"}
            </button>
        </div>
    )
}

export default WizardStep1