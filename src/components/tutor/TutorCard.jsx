import {getTutorImage} from "../../utils/getTutorImage"
import {Link} from "react-router-dom"
function TutorCard({tutor}) {
    return(
     <Link to={`/tutors/${tutor.id}`}>
      <div className="rounded-2xl border border-tl-border 
      bg-white p-5 shadow-sm hover:shadow-md 
      hover:-translate-y-0.5 transition cursor-pointer">
        
        <div className="flex gap-4">
          
         
          <img
            src={getTutorImage(tutor)}
            alt="Tutor avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />

          
          <div className="flex-1">
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="font-semibold text-tl-ink">
                  {tutor.firstname} {tutor.lastname}
                </h2>

                <p className="text-sm text-tl-muted">
                  {tutor.subjects}
                </p>
              </div>

              <p className="font-semibold text-tl-ink whitespace-nowrap">
                ${tutor.hourlyRate}/h
              </p>
            </div>

            
            {tutor.bio && (
              <p className="mt-3 text-sm text-tl-ink line-clamp-2">
                {tutor.bio}
              </p>
            )}

            
            <div className="mt-4 border-t border-tl-border pt-3 text-xs text-tl-muted flex gap-4">
              <span>{tutor.location || "Unknown location"}</span>
              <span>{tutor.remote ? "Online" : "In-person"}</span>
            </div>

          </div>
        </div>

      </div>
    </Link>
    
)

}
export default TutorCard