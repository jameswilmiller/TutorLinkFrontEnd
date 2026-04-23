import {Link} from "react-router-dom"

function MobileProfile({ handleLogout, menuItems, user, closeMenus }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-tl-surface lg:hidden">
      <div className="flex items-center justify-between border-b border-tl-border px-5 py-4">
        <div>
          <p className="font-display text-2xl">{user?.firstname}</p>
          <p className="text-sm text-tl-muted">{user?.email}</p>
        </div>

        <button
          onClick={closeMenus}
          className="rounded-full px-2 py-2 text-tl-ink hover:bg-tl-bg cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round">
                    <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                    </>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-tl-border px-5 py-5">
        <img
          src="/default-avatar.png"
          alt="Profile"
          className="h-16 w-16 rounded-full border border-tl-border bg-tl-bg"
        />
        <div>
          <p className="font-display text-xl">{user?.firstname}</p>
          <p className="text-sm text-tl-muted">{user?.email}</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col py-2">
        {menuItems.map((i) => (
          <li key={i.href}>
            <Link
              to={i.href}
              onClick={closeMenus}
              className="block px-5 py-4 text-lg text-tl-ink hover:bg-tl-bg"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-tl-border p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl bg-tl-bg px-4 py-3 text-center text-red-400 hover:bg-neutral-200"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default MobileProfile