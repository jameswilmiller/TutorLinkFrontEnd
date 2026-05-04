import { useSearchParams } from "react-router-dom"

const FACULTIES = [
  { label: "All", value: "all" },
  { label: "Business, Economics & Law", value: "BUSINESS_ECONOMICS_LAW" },
  { label: "Engineering, Architecture & IT", value: "ENGINEERING_ARCHITECTURE_IT" },
  { label: "Health, Medicine & Behavioural Sciences", value: "HEALTH_MEDICINE_BEHAVIOURAL_SCIENCES" },
  { label: "Humanities, Arts & Social Sciences", value: "HUMANITIES_ARTS_SOCIAL_SCIENCES" },
  { label: "Science", value: "SCIENCE" },
]

function BrowseFaculty() {
  const [searchParams, setSearchParams] = useSearchParams();
  const faculty = searchParams.get("faculty");

  function updateFaculty(nextFaculty) {
    const params = new URLSearchParams(searchParams);
    if (nextFaculty === "all") {
      params.delete("faculty");
    } else {
      params.set("faculty", nextFaculty);
    }
    setSearchParams(params);
  }

  return (
    <section>
      <p className="mb-2 text-heading-xs font-semibold tracking-wide text-tl-muted">
        FACULTY
      </p>
      <div className="space-y-2">
        {FACULTIES.map((item) => {
          const isActive = item.value === "all" ? faculty === null : faculty === item.value;
          return (
            <button
              key={item.value}
              onClick={() => updateFaculty(item.value)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition cursor-pointer
                ${isActive ? "bg-tl-accent text-white" : "text-tl-ink hover:bg-white"}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default BrowseFaculty