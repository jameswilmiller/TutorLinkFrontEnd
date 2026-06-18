import RoleToggle from "./RoleToggle"
import { useState } from "react"

const COPY = {
    STUDENT: {
        title: "Sessions you've booked",
        subtitle: "lessons you've booked with other tutors.",
    },
    TUTOR: {
        title: "Sessions you're teaching",
        subtitle: "Students who have booked you as their tutor.",
    },
}

function MyBookingsPageHeader({isTutor, currentRole, onRoleChange}) {
    const copy = COPY[currentRole]
    
   
    
    return (
        <div className = "bg-tl-surface border-b border-tl-border" >
            <div className="max-w-350 mx-auto px-6 py-5 flex flex-col items-start gap-4">
                {isTutor && <RoleToggle currentRole={currentRole} onRoleChange={onRoleChange}/>}
                <div>
                    <h1 className="font-display text-4xl text-tl-ink mb-2">{copy.title}</h1>
                    <p className="text-tl-muted mb-8">{copy.subtitle}</p>
                </div>
            </div>
            

        </div>
    )
}
export default MyBookingsPageHeader
