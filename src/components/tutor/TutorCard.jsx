import { getTutorImage } from "../../utils/getTutorImage"
import { Link } from "react-router-dom"

function TutorCard({ tutor }) {
    const topCredential = tutor.credentials?.[0];

    return (
        <Link to={`/tutors/${tutor.id}`}>
            <div className="cursor-pointer group bg-white border border-tl-border rounded-2xl overflow-hidden hover:border-tl-accent transition">

         
                <div className="relative aspect-square w-full overflow-hidden">
                    <img
                        src={getTutorImage(tutor)}
                        alt={`${tutor.firstname} ${tutor.lastname}`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-avatar.png";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                 
                    <span className="absolute top-3 right-3 bg-white/90 text-tl-ink text-xs font-medium px-3 py-1 rounded-full">
                        {tutor.remote && tutor.location
                            ? "Online + In Person"
                            : tutor.remote
                            ? "Online"
                            : "In Person"}
                    </span>
                </div>

             
                <div className="p-4">
                    <p className="font-semibold text-tl-ink text-base">
                        {tutor.firstname} {tutor.lastname}
                    </p>
                    <p className="text-sm text-tl-muted flex items-center gap-1 mt-0.5">
                        
                        {tutor.location}
                    </p>

           
                    <div className="flex items-center gap-2 mt-2 text-sm">
                        {tutor.reviewCount > 0 ? (
                            <>
                                <span className="text-amber-400">
                                    {"★".repeat(Math.round(tutor.averageRating))}
                                    <span className="text-tl-border">
                                        {"★".repeat(5 - Math.round(tutor.averageRating))}
                                    </span>
                                </span>
                                <span className="font-semibold text-tl-ink">
                                    {tutor.averageRating.toFixed(1)}
                                </span>
                                <span className="text-tl-muted">
                                    · {tutor.reviewCount} review{tutor.reviewCount !== 1 ? "s" : ""}
                                </span>
                            </>
                        ) : (
                            <span className="text-tl-ink">New Tutor </span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {tutor.courses?.slice(0, 3).map(c => (
                            <span
                                key={c.id}
                                className="bg-tl-accent text-white text-xs font-medium px-2.5 py-1 rounded-lg"
                            >
                                {c.courseCode}
                            </span>
                        ))}
                        {tutor.courses?.length > 3 && (
                            <span className="text-xs text-tl-muted">
                                +{tutor.courses.length - 3}
                            </span>
                        )}
                    </div>

                 
                    {tutor.bio && (
                        <p className="text-sm text-tl-muted line-clamp-2 mt-3">
                            {tutor.bio}
                        </p>
                    )}

                  
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-tl-border">
                        <p className="text-tl-ink">
                            <span className="font-display text-2xl">${tutor.hourlyRate}</span>
                            <span className="text-tl-muted text-sm">/hr</span>
                        </p>
                        {topCredential && (
                            <div className="text-right">
                                <p className="text-sm text-tl-ink">{topCredential.title}</p>
                                {topCredential.institution && (
                                    <p className="text-xs text-tl-muted">
                                        {topCredential.institution}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default TutorCard