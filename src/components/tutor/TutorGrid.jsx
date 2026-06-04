import TutorCard from "../tutor/TutorCard"

function TutorGrid({tutors}) {
    if (!tutors.length) {
        return (
            <p> No tutors found. </p>
        )
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
            {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor}/>
            ))}
        </div>
    )
}
export default TutorGrid