import TutorCard from "../tutor/TutorCard"

function TutorGrid({tutors}) {
    if (!tutors.length) {
        return (
            <p> No tutors found. </p>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor}/>
            ))}
        </div>
    )
}
export default TutorGrid