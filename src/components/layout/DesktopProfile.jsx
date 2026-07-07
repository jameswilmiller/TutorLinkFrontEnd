import { Link } from "react-router-dom"

import { FiLogOut } from "react-icons/fi"
 
function DesktopProfile({ handleLogout, learningItems, tutoringItems, isTutor, user, closeMenus }) {
    return (
        <div className="absolute right-0 top-full mt-2 w-80 flex flex-col overflow-hidden rounded-3xl border border-tl-border bg-tl-surface shadow-2xl z-50">
            <div className="flex items-center gap-3 px-5 pt-5 pb-4">
                <div className="h-12 w-12 rounded-full bg-tl-ink text-white flex items-center justify-center font-semibold">
                    {(user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")}
                </div>
                <div>
                    <p className="font-semibold text-tl-ink">{user?.firstname} {user?.lastname}</p>
                    <p className="text-tl-muted text-xs">{user?.email}</p>
                    <div className="flex gap-1.5 mt-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-tl-bg border border-tl-border text-xs text-tl-ink">
                            Student
                        </span>
                        {isTutor && (
                            <span className="px-2 py-0.5 rounded-full bg-tl-ink text-white text-xs">
                                Tutor
                            </span>
                        )}
                    </div>
                </div>
            </div>
 
            <div className="h-px bg-tl-border" />
 
            <p className="px-5 pt-3 pb-1 text-xs font-semibold tracking-widest text-tl-muted uppercase">
                Learning
            </p>
            <ul className="flex flex-col pb-2">
                {learningItems.map(item => (
                    <li key={item.href}>
                        <Link to={item.href} onClick={closeMenus} className="flex items-center gap-3 px-5 py-2.5 hover:bg-tl-bg">
                            <item.icon size={18} className="text-tl-ink" />
                            <span>
                                <span className="block text-sm font-medium text-tl-ink">{item.label}</span>
                                <span className="block text-xs text-tl-muted">{item.subtitle}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
 
            {isTutor ? (
                <>
                    <div className="h-px bg-tl-border" />
                    <p className="px-5 pt-3 pb-1 text-xs font-semibold tracking-widest text-tl-muted uppercase">
                        Tutoring
                    </p>
                    <ul className="flex flex-col pb-2">
                        {tutoringItems.map(item => (
                            <li key={item.href}>
                                <Link to={item.href} onClick={closeMenus} className="flex items-center gap-3 px-5 py-2.5 hover:bg-tl-bg">
                                    <item.icon size={18} className="text-tl-ink" />
                                    <span className="flex-1">
                                        <span className="block text-sm font-medium text-tl-ink">{item.label}</span>
                                        <span className="block text-xs text-tl-muted">{item.subtitle}</span>
                                    </span>
                                    {item.badge > 0 && (
                                        <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-tl-ink text-white text-xs">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="mx-4 my-2 rounded-2xl bg-tl-ink p-4 text-white">
                    <p className="text-sm font-semibold">Earn while you study</p>
                    <p className="text-xs text-white/70 mt-1">Tutor the UQ courses you've already aced.</p>
                    <Link
                        to="/become-a-tutor"
                        onClick={closeMenus}
                        className="block mt-3 rounded-xl bg-white py-2 text-center text-sm font-medium text-tl-ink hover:bg-tl-bg"
                    >
                        Become a tutor →
                    </Link>
                </div>
            )}
 
            <div className="h-px bg-tl-border" />
 
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-tl-bg cursor-pointer"
            >
                <FiLogOut size={18} />
                Log out
            </button>
        </div>
    )
}
 
export default DesktopProfile