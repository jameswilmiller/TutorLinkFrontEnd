import { useSearchParams } from "react-router-dom"

function BrowseSubject() {
    const [searchParams, setSearchParams] = useSearchParams();
    const subject = searchParams.get("subject" || "all");
    const SUBJECTS = [
    { label: "All", value: "all" },
    { label: "Math", value: "math" },
    { label: "Guitar", value: "guitar" },
    { label: "Spanish", value: "spanish" },
    { label: "Coding", value: "coding" },
    ];
    
    function updateSubject(nextSubject) {
        const params = new URLSearchParams(searchParams);

        if (nextSubject == "all") {
            params.delete("subject");
        } else {
            params.set("subject", nextSubject);
        }
        setSearchParams(params);
    }
    
 return (
    <section>
      <p className="mb-2 text-heading-xs font-semibold tracking-wide text-tl-muted">
        SUBJECT
      </p>

      <div className="space-y-2">
        {SUBJECTS.map((item) => {
          const isActive = 
            item.value === "all" ? subject === null : subject === item.value;

          return (
            <button
              key={item.value}
              onClick={() => updateSubject(item.value)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition cursor-pointer
                ${
                  isActive
                    ? "bg-tl-accent text-white"
                    : "text-tl-ink hover:bg-white"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
export default BrowseSubject