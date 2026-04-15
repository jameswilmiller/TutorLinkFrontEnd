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



return (
    <div className = "flex justify-center items-center py-12">


    </div>
)
}
export default Carousel;
