import { getTutorImage } from "../../utils/getTutorImage"

function TutorProfileHeader({ tutor }) {
    return (
        <div>
            <div className="flex gap-6 items-center">
                <img
                    src={getTutorImage(tutor)}
                    alt={tutor.firstname}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
                    className="h-48 w-48 rounded-full object-cover shrink-0 border border-tl-border"
                />
                <div>
                    <p className="text-sm text-tl-muted font-bold uppercase tracking-wide">
                        {tutor.faculties?.map(f =>
                            f.replace(/_/g, " ")
                        ).join(", ")}
                    </p>
                    <h1 className="font-display text-display-2xl text-tl-ink mt-1">
                        {tutor.firstname} {tutor.lastname}
                    </h1>
                    {tutor.tagline && (
                        <p className="mt-2 font-display text-tl-muted text-heading-md italic">
                            "{tutor.tagline}"
                        </p>
                    )}
                </div>
            </div>

            
        </div>
    )
}

export default TutorProfileHeader