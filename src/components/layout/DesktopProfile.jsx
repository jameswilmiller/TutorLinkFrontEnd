import { Link } from "react-router-dom"

function DesktopProfile({ handleLogout, menuItems, user }) {
    return (
        <div className="absolute right-0 top-full mt-2 w-80 flex flex-col overflow-hidden rounded-3xl border border-tl-border bg-tl-surface shadow-2xl z-50">
            <div className="flex justify-between items-center px-5 pt-5 pb-4">
                <div>
                    <p className="font-display text-3xl">{user?.firstname}</p>
                    <p className="text-tl-muted text-sm">{user?.email}</p>
                </div>
                <img
                    src="/default-avatar.png"
                    alt="Profile"
                    className="h-16 w-16 rounded-full border border-tl-border bg-tl-bg"
                />
            </div>

            <div className="h-px bg-tl-border" />

            <ul className="flex flex-col py-2">
                {menuItems.map(item => (
                    <li key={item.href}>
                        <Link to={item.href} className="block px-4 py-2 text-tl-ink hover:bg-tl-bg">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-2">
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-2xl text-red-400 text-center bg-tl-bg hover:bg-neutral-200 cursor-pointer"
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default DesktopProfile