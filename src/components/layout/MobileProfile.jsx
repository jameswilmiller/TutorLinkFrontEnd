import { Link } from "react-router-dom"

function MobileProfile({ handleLogout, menuItems, user, closeMenus }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-tl-surface lg:hidden">
            <div className="flex items-center justify-between border-b border-tl-border px-5 py-4">
                <img
                    src="/default-avatar.png"
                    alt="Profile"
                    className="h-12 w-12 rounded-full border border-tl-border bg-tl-bg"
                />
                <div className="flex-1 ml-4">
                    <p className="font-display text-xl">{user?.firstname}</p>
                    <p className="text-sm text-tl-muted">{user?.email}</p>
                </div>
                <button
                    onClick={closeMenus}
                    className="rounded-full p-2 text-tl-ink hover:bg-tl-bg cursor-pointer"
                    aria-label="Close menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                </button>
            </div>

            <ul className="flex flex-col py-2">
                {menuItems.map(item => (
                    <li key={item.href}>
                        <Link
                            to={item.href}
                            onClick={closeMenus}
                            className="block px-5 py-4 text-lg text-tl-ink hover:bg-tl-bg"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="border-t border-tl-border p-4">
                <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl bg-tl-bg px-4 py-3 text-center text-red-400 hover:bg-neutral-200 cursor-pointer"
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default MobileProfile