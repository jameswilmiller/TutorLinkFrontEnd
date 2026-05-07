import { Link } from "react-router-dom"

const PLATFORM_LINKS = [
    { label: "Browse tutors", href: "/browse" },
    { label: "Become a tutor", href: "/become-a-tutor" },
]

const COMPANY_LINKS = [
    { label: "About", href: "/about" },
    { label: "Help", href: "/help" },
]

function Footer() {
    return (
        <footer className="bg-tl-accent">
            <div className="max-w-350 mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row justify-between gap-10">
                 
                    <div className="max-w-xs">
                        <p className="font-display text-2xl text-white">TutorLink</p>
                        <p className="text-sm text-white/60 mt-2 leading-relaxed">
                            University peer tutoring.
                            <br/>
                            Built by a student, for students.
                        </p>
                    </div>

                  
                    <div className="flex gap-20">
                        <div>
                            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">
                                Platform
                            </p>
                            <ul className="space-y-2">
                                {PLATFORM_LINKS.map(link => (
                                    <li key={link.href}>
                                        <Link to={link.href} className="text-sm text-white/70 hover:text-white transition">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">
                                Company
                            </p>
                            <ul className="space-y-2">
                                {COMPANY_LINKS.map(link => (
                                    <li key={link.href}>
                                        <Link to={link.href} className="text-sm text-white/70 hover:text-white transition">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

               
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
                    <p className="text-xs text-white/50">
                        © 2026 TutorLink. Not affiliated with The University of Queensland.
                    </p>
                    <p className="text-xs text-white/50">
                        Made in Brisbane.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer