import { Link } from "react-router-dom"
import { FiLogOut, FiX } from "react-icons/fi"
 
function MobileProfile({ handleLogout, learningItems, tutoringItems, isTutor, user, closeMenus }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-tl-surface lg:hidden">
            <div className="flex items-center justify-between border-b border-tl-border px-5 py-4">
                <div className="h-12 w-12 rounded-full bg-tl-ink text-white flex items-center justify-center font-semibold">
                    {(user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")}
                </div>
                <div className="flex-1 ml-4">
                    <p className="font-display text-xl">{user?.firstname} {user?.lastname}</p>
                    <p className="text-sm text-tl-muted">{user?.email}</p>
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
                <button
                    onClick={closeMenus}
                    className="rounded-full p-2 text-tl-ink hover:bg-tl-bg cursor-pointer"
                    aria-label="Close menu"
                >
                    <FiX size={24} />
                </button>
            </div>
 
            <p className="px-5 pt-4 pb-1 text-xs font-semibold tracking-widest text-tl-muted uppercase">
                Learning
            </p>
            <ul className="flex flex-col pb-2">
                {learningItems.map(item => (
                    <li key={item.href}>
                        <Link to={item.href} onClick={closeMenus} className="flex items-center gap-3 px-5 py-3 hover:bg-tl-bg">
                            <item.icon size={20} className="text-tl-ink" />
                            <span>
                                <span className="block text-lg text-tl-ink">{item.label}</span>
                                <span className="block text-sm text-tl-muted">{item.subtitle}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
 
            {isTutor ? (
                <>
                    <p className="px-5 pt-2 pb-1 text-xs font-semibold tracking-widest text-tl-muted uppercase border-t border-tl-border mt-2">
                        Tutoring
                    </p>
                    <ul className="flex flex-col pb-2">
                        {tutoringItems.map(item => (
                            <li key={item.href}>
                                <Link to={item.href} onClick={closeMenus} className="flex items-center gap-3 px-5 py-3 hover:bg-tl-bg">
                                    <item.icon size={20} className="text-tl-ink" />
                                    <span className="flex-1">
                                        <span className="block text-lg text-tl-ink">{item.label}</span>
                                        <span className="block text-sm text-tl-muted">{item.subtitle}</span>
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
                <div className="mx-4 my-3 rounded-2xl bg-tl-ink p-4 text-white">
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
 
            <div className="border-t border-tl-border p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-tl-bg px-4 py-3 text-red-500 hover:bg-neutral-200 cursor-pointer"
                >
                    <FiLogOut size={18} />
                    Log Out
                </button>
            </div>
        </div>
    )
}
 
export default MobileProfile