function SubjectBubbles() {
    const subjects = ["Mathematical Methods", "Piano Beginner", "Conversational Spanish", "Coding", "Painting"]
    return(
        <ul className="flex flex-row justify-center mt-6 gap-8">
            {subjects.map(subject => (
                <li className="border-tl-border rounded-full px-1.5 py-1.5 border cursor-pointer
                text-body text-tl-muted hover:bg-tl-subtle">
                    {subject}
                </li>

            ))}
        </ul>
    )
}
export default SubjectBubbles