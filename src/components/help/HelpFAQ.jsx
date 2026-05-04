import { useState } from "react"

const TABS = [
    {
        label: "For Students",
        faqs: [
            {
                question: "How do I find a tutor?",
                answer: "Browse tutors by searching for your course code or name — for example, MATH1051 or Calculus. You can also filter by faculty or lesson mode. Click on a tutor to view their full profile including their bio, teaching style, and hourly rate."
            },
            {
                question: "How do I contact a tutor?",
                answer: "On a tutor's profile, click 'Book a lesson' or 'Message first'. This opens a short form where you can share your name, email, which course you need help with, and a message. When you submit, the tutor receives an email with your details and will follow up with you directly."
            },
            {
                question: "How does booking and payment work?",
                answer: "TutorLink doesn't handle bookings or payments directly. Once a tutor receives your enquiry and gets in touch, all scheduling and payment is arranged between you and the tutor off-platform. This keeps things flexible and simple for both sides."
            },
            {
                question: "Is TutorLink free to use?",
                answer: "Browsing and contacting tutors is completely free. Tutors set their own hourly rates which are shown on their profiles. What you pay is agreed directly with the tutor."
            },
            {
                question: "What courses are available?",
                answer: "TutorLink currently covers over 120 UQ courses across all 5 faculties — Business, Economics & Law, Engineering, Architecture & IT, Health, Medicine & Behavioural Sciences, Humanities, Arts & Social Sciences, and Science. If your course isn't listed, reach out and we'll look at adding it."
            },
        ]
    },
    {
        label: "For Tutors",
        faqs: [
            {
                question: "How do I become a tutor?",
                answer: "Sign up for a TutorLink account, then click 'Become a Tutor' in the navigation. You'll be guided through a short setup process where you add your bio, the courses you teach, your hourly rate, and a profile photo. Once done, your profile is live and searchable by students."
            },
            {
                question: "How do I get enquiries?",
                answer: "When a student submits an enquiry through your profile, you'll receive an email with their name, email address, and message. You can then reply directly to arrange a session."
            },
            {
                question: "Can I edit my profile after setting it up?",
                answer: "Yes — click 'Edit My Listing' in the navigation menu once you're logged in. You can update any part of your profile at any time, including your courses, rate, bio, and profile photo."
            },
            {
                question: "How do I handle payment?",
                answer: "Payment is entirely between you and the student. TutorLink doesn't take a commission or process any payments. You agree on a rate and payment method directly with each student."
            },
        ]
    },
    {
        label: "General",
        faqs: [
            {
                question: "What is TutorLink?",
                answer: "TutorLink is a peer tutoring platform built specifically for UQ students. It makes it easy to find other students who've already completed your courses and are happy to help. It's a personal project — not affiliated with the University of Queensland."
            },
            {
                question: "Are tutors verified?",
                answer: "Tutors are not formally verified at this stage. Tutors self-report their credentials and courses. We'd encourage students to have a chat with a tutor before committing to a session to make sure they're a good fit."
            },
            {
                question: "Is TutorLink affiliated with UQ?",
                answer: "No. TutorLink is an independent personal project and is not affiliated with, endorsed by, or connected to the University of Queensland. It's designed to be a complementary tool alongside UQ's own resources — not a replacement for them."
            },
            {
                question: "I have feedback or found a bug — who do I contact?",
                answer: "Please reach out at tutorlink.help@gmail.com. Feedback is genuinely appreciated — this is a work in progress and every bit helps."
            },
        ]
    }
]

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-tl-border py-5">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between text-left"
            >
                <span className="text-tl-ink font-medium">{question}</span>
                <span className="text-tl-muted text-xl ml-4">{open ? "−" : "+"}</span>
            </button>
            {open && (
                <p className="mt-3 text-tl-muted text-sm leading-relaxed">
                    {answer}
                </p>
            )}
        </div>
    )
}

function HelpFAQ() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b border-tl-border mb-2">
                {TABS.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                            activeTab === index
                                ? "border-tl-ink text-tl-ink"
                                : "border-transparent text-tl-muted hover:text-tl-ink"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* FAQs */}
            <div>
                {TABS[activeTab].faqs.map(faq => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    )
}

export default HelpFAQ