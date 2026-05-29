import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import DesktopProfile from "./DesktopProfile"
import MobileProfile from "./MobileProfile"

const MENU_ITEMS = [
    { label: "My Bookings", href: "/bookings" },
]

function UserMenu({ desktopOpen, mobileOpen, toggleProfileMenu, closeMenus }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const ref = useRef()

    const name = user?.firstname || "U"

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
                    menuItems={MENU_ITEMS}
                    user={user}
                />
            )}

            {mobileOpen && (
                <MobileProfile
                    closeMenus={closeMenus}
                    handleLogout={handleLogout}
                    menuItems={MENU_ITEMS}
                    user={user}
                />
            )}
        </div>
    )
}

export default UserMenu