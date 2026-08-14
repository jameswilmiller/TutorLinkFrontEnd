import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { FiCalendar, FiChevronDown, FiFileText, FiInbox, FiUser } from "react-icons/fi"
import DesktopProfile from "./DesktopProfile"
import MobileProfile from "./MobileProfile"
import { getTutorBookings } from "../../services/bookingService"
import { getMyTutorProfile } from "../../services/tutorService"
const LEARNING_ITEMS = [
    { label: "My Bookings", subtitle: "Lessons you've booked", href: "/bookings", icon: FiCalendar },
]

function UserMenu({ desktopOpen, mobileOpen, toggleProfileMenu, closeMenus }) {
    const { user, logout, accessToken, authedRequest } = useAuth()
    const navigate = useNavigate()
    const ref = useRef()
    const isTutor = user?.roles?.includes("TUTOR")
    const [pendingCount, setPendingCount] = useState(0)
    const name = user?.firstname || "U"
    const [tutorProfile, setTutorProfile] = useState({ userId: null, slug: null })
    const tutorSlug = tutorProfile.userId === user?.id ? tutorProfile.slug : null

    const tutoringItems = [
    { label: "My Listing", subtitle: "Edit your tutor profile", href: "/tutor/dashboard", icon: FiFileText },
    { label: "Booking Requests", subtitle: "Students booking you", href: "/bookings", icon: FiInbox, badge: pendingCount },
    ...(tutorSlug
        ? [{ label: "Public Profile", subtitle: "View as students see it", href: `/tutors/${tutorSlug}`, icon: FiUser }]
        : []),
]
    useEffect(() => {
        const forUserId = user?.id
        if (!isTutor || !accessToken || !forUserId) return

        let cancelled = false
        authedRequest(token => getMyTutorProfile(token))
            .then(tutor => { if (!cancelled) setTutorProfile({ userId: forUserId, slug: tutor.slug }) })
            .catch(() => { if (!cancelled) setTutorProfile({ userId: forUserId, slug: null }) })
        return () => { cancelled = true }
    }, [isTutor, accessToken, authedRequest, user?.id])

    useEffect(() => {
        if (!desktopOpen) return
 
        function handler(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                closeMenus()
            }
        }
 
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [closeMenus, desktopOpen])
 
    async function handleLogout() {
        await logout()
        closeMenus()
        navigate("/")
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-tl-accent text-white text-sm hover:bg-tl-accent-hover cursor-pointer"
            >
                <span>{name}</span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition ${desktopOpen || mobileOpen ? "rotate-180" : ""}`}
                >
                    <polyline points="6 8 10 12 14 8" />
                </svg>
            </button>

            {desktopOpen && (
                <DesktopProfile
                    handleLogout={handleLogout}
                    learningItems={LEARNING_ITEMS}
                    tutoringItems={tutoringItems}
                    isTutor={isTutor}
                    user={user}
                    closeMenus={closeMenus}
                />
            )}

            {mobileOpen && (
                <MobileProfile
                    handleLogout={handleLogout}
                    learningItems={LEARNING_ITEMS}
                    tutoringItems={tutoringItems}
                    isTutor={isTutor}
                    user={user}
                    closeMenus={closeMenus}
                />
            )}
        </div>
    )
}

export default UserMenu