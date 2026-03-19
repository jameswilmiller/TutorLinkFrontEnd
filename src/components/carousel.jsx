import { useState } from "react"
import { getTutorImage } from "../utils/getTutorImage"

function Carousel({tutors}) { 
    const [currentIndex, setCurrentIndex] = useState(0);


if (!tutors || tutors.length === 0) {
    return <p> no tutors are currently available </p>;
}
const prevIndex = 
currentIndex === 0 ? tutors.length - 1 : currentIndex - 1;
const nextIndex =
currentIndex === tutors.length -1 ? 0 : currentIndex + 1;


const prevTutor = tutors[prevIndex]
const currentTutor = tutors[currentIndex]
const nextTutor = tutors[nextIndex]

const goPrev = () => setCurrentIndex(prevIndex);
const goNext = () => setCurrentIndex(nextIndex);

return (
    <div className = "flex justify-center items-center py-12">

        {/* LEFT TUTOR CARD */}
        <button 
        onClick={() => setCurrentIndex(prevIndex)}
        className ="absolute left-10 w-52 h-72 rounded-x1 overflow-hidden
                    bg-blue-400/70 shadow-lg
                    blur-sm opacity-80 hover:scale-105 transition"
        >
        <img
         src={getTutorImage(prevTutor)}
         alt={prevTutor.username}
         className="w-full h-full object-cover"
         />
         </button>

        {/* CENTER TUTOR CARD */}
        <div className = "z-10 w-80 bg-blue-500 rounded-2x1 p-5 shadow-2x1">
            <img
            src={getTutorImage(currentTutor)}
            alt={currentTutor.username}
            className="w-full h-56 object-cover rounded-lg"
            />
        

        </div>

    </div>
)
}
export default Carousel;
