import { useNavigate } from "react-router-dom";
import {getTutorImage} from "../utils/getTutorImage"

function TutorCard({tutor}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/tutors/${tutor.id}`);
    }
    return (
        <div
         onClick={handleClick}
         className="group cursor-pointer"
         >
            <div className="overflow-hidden rounded-2xl bg-gray-100">
                <img
                src={getTutorImage(tutor)}
                alt={tutor.username || "Tutor"}
                className="h-72 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
            </div>

            <div className = "pt-3 space-y-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-[15px] font-semibold text-gray-900">
                            {tutor.firstname} {tutor.lastname}
                        </h3>
                        <p className = "text-sm text-gray-500">
                            {tutor.location || "Online"}
                        </p>

                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                        {tutor.hourlyRate ? `$${tutor.hourlyRate}/hr` : "Rate not listed"}
                    </p>
                </div>

                <p className = "text-sm text-gray-700">
                    {Array.isArray(tutor.subjects)
                        ? tutor.subjects.join(", ")
                        : tutor.subjects || "Subjects not listed"}
                </p>

                <p className="line-clamp-2 text-sm text-gray-500">
                    {tutor.bio || "No bio added yet"}
                </p>
            </div>
        </div>
      
    )
}
export default TutorCard;