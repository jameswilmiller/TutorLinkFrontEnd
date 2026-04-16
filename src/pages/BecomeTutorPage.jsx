import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationAutoComplete from "../components/shared/LocationAutoComplete";
import { useAuth } from "../hooks/useAuth";
import { apiPost } from "../services/apiClient";
import {
  getMyTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  uploadProfileImage,
} from "../services/tutorService";

function BecomeTutorPage() {
  const navigate = useNavigate();
  const { accessToken, user, setUser } = useAuth();

  const [mode, setMode] = useState("create");
  const [existingTutorId, setExistingTutorId] = useState(null);

  const [formData, setFormData] = useState({
    subjects: "",
    bio: "",
    location: "",
    latitude: null,
    longitude: null,
    hourlyRate: "",
    remote: false,
    profileImageKey: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const tutor = await getMyTutorProfile(accessToken);

        setMode("edit");
        setExistingTutorId(tutor.id);

        setFormData({
          subjects: tutor.subjects || "",
          bio: tutor.bio || "",
          location: tutor.location || "",
          latitude: tutor.latitude ?? null,
          longitude: tutor.longitude ?? null,
          hourlyRate: tutor.hourlyRate ?? "",
          remote: !!tutor.remote,
          profileImageKey: tutor.profileImageKey || "",
        });

        if (tutor.profileImageKey) {
          setPreviewUrl(tutor.profileImageKey);
        }
      } catch (err) {
        setMode("create");
      } finally {
        setPageLoading(false);
      }
    }

    loadProfile();
  }, [accessToken]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePlaceSelected(placeData) {
    setFormData((prev) => ({
      ...prev,
      location: placeData.locationName,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(formData.profileImageKey || "");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      let profileImageKey = formData.profileImageKey;

      if (selectedFile) {
        const uploadResult = await uploadProfileImage(selectedFile, accessToken);
        profileImageKey = uploadResult.imageUrl;
      }

      const isTutor = user?.roles?.includes("TUTOR");

      if (!isTutor) {
        const updatedUser = await apiPost("/users/me/become-tutor", null, accessToken);
        setUser(updatedUser);
      }

      const payload = {
        subjects: formData.subjects,
        bio: formData.bio,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : null,
        remote: formData.remote,
        profileImageKey,
      };

      let savedTutor;

      if (mode === "edit") {
        savedTutor = await updateTutorProfile(payload, accessToken);
        setSuccessMessage("Tutor profile updated.");
      } else {
        savedTutor = await createTutorProfile(payload, accessToken);
        setMode("edit");
        setExistingTutorId(savedTutor.id);
        setSuccessMessage("Tutor profile created.");
      }

      setFormData((prev) => ({
        ...prev,
        profileImageKey: savedTutor.profileImageKey || profileImageKey || "",
      }));

      if (savedTutor.profileImageKey) {
        setPreviewUrl(savedTutor.profileImageKey);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save tutor profile.");
    } finally {
      setSaving(false);
    }
  }

  if (pageLoading) {
    return <p className="px-6 py-10">Loading tutor form...</p>;
  }

  return (
    <div className="py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {mode === "edit" ? "Edit Tutor Profile" : "Become a Tutor"}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {mode === "edit" ? "Update your tutor listing" : "Create your tutor listing"}
          </h1>

          <p className="mt-3 text-gray-600">
            Fill out your details so students can find and book you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Picture
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700"
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="mt-4 h-40 w-40 rounded-2xl object-cover"
              />
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subjects
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="Math, Physics, Programming"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={6}
              placeholder="Tell students about yourself..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="rounded-xl border border-gray-300 px-3 py-2 focus-within:border-indigo-500">
              <LocationAutoComplete
                value={formData.location}
                onPlaceSelected={handlePlaceSelected}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Hourly Rate
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="50"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="remote"
              checked={formData.remote}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-700">
              Available for online lessons
            </span>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : mode === "edit"
                ? "Update Tutor Profile"
                : "Create Tutor Listing"}
            </button>

            {existingTutorId && (
              <button
                type="button"
                onClick={() => navigate(`/tutors/${existingTutorId}`)}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
              >
                View Public Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BecomeTutorPage;