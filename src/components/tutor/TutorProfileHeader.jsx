import { getTutorImage } from "../../utils/getTutorImage"

function TutorProfileHeader({ tutor }) {
    return (
        <div>
            <div className="flex items-center gap-6">
                <img
                    src={getTutorImage(tutor)}
                    alt={tutor.firstname}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png" }}
                    className="h-24 w-24 rounded-full object-cover shrink-0 border border-tl-border"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase">
                            {tutor.faculties?.[0]?.replace(/_/g, " ") || "—"}
                        </p>
                        
                    </div>
                    <h1 className="font-display text-5xl text-tl-ink">
                        {tutor.firstname} {tutor.lastname}
                    </h1>
                    {tutor.tagline && (
                        <p className="mt-1 font-display text-tl-muted text-xl italic">
                            "{tutor.tagline}"
                        </p>
                    )}
                </div>
            </div>

            
            <div className="flex flex-wrap items-center gap-6 mt-5 text-sm text-tl-muted">
                {tutor.location && (
                    <span className="flex items-center gap-1">{tutor.location}</span>
                )}
                {tutor.remote && (
                    <span className="flex items-center gap-1">Online available</span>
                )}
                
            </div>
        </div>
    )
}

export default TutorProfileHeader