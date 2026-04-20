import find from "../assets/find.svg"
import verified from "../assets/verified.svg"
import easy from "../assets/easy.svg"
import learn from "../assets/learn.svg"
import clear from "../assets/clear.svg"
import track from "../assets/track.svg"

export default function FeaturesGrid() {
    const items = [
        {
            title: "Find Tutors Fast", 
            text: "search by level, and location to find the perfect tutor in seconds" ,
            img: find
        },
        {
            title: "Verified Tutors",
            text: "Tutors are verified and reviewed so you can book with confidence",
            img: verified
        },
        {
            title: "Easy Booking",
            text: "Schedule sessions at times that suit you with just a few clicks",
            img: easy
        },
        {
            title: "Learn Your Way",
            text: "Choose between online lessons or in-person tutoring near you",
            img: learn
        },
        {
            title: "clear pricing",
            text: "See tutor rates upfront-no hidden fees or surprises",
            img: clear
        },
        {
            title: "Track Progress",
            text: "Stay on top of your learning with session history and progress tracking",
            img: track,
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
                <div key={item.title}>
                    <img src={item.img} alt={item.title}/>
                    <h3>{item.title}</h3>
                    <p>{item.text} </p>
                </div>
            ))}
        </div>
    )
}