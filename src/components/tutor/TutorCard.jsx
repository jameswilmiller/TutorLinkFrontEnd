import { getTutorImage } from "../../utils/getTutorImage"
import { Link } from "react-router-dom"

function TutorCard({ tutor }) {
    return (
        <Link to={`/tutors/${tutor.id}`}>
            <div className="cursor-pointer group">
                
                <div className="relative aspect-square overflow-hidden rounded-2xl w-full ">
                    <img
                        src={getTutorImage(tutor)}
                        alt="Tutor avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-avatar.png";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                   
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent rounded-2xl"/>

                   
                    <div className="absolute bottom-3 left-4">
                        <p className="font-semibold text-white text-base">
                            {tutor.firstname}
                        </p>
                        <p className="text-white/80 text-sm">
                            {tutor.location}{tutor.remote ? " (online)" : ""}
                        </p>
                    </div>
                </div>

                
                <div className="mt-2">
                    <p className="text-sm text-tl-ink">
                       <span className="font-medium">
                            {tutor.courses?.slice(0, 3).map(c => c.courseCode).join(", ")}
                            {tutor.courses?.length > 3 && ` +${tutor.courses.length - 3} more`} -{" "}
                       </span>
                        {tutor.bio && (
                            <span className="text-tl-muted line-clamp-2">{tutor.bio}</span>
                        )}
                    </p>
                    <p className="pt-1 font-semibold text-tl-ink text-caption">
                        ${tutor.hourlyRate}/h
                    </p>
                </div>

            </div>
        </Link>
    )
}

export default TutorCard