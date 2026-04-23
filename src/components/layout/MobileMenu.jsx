import { Link } from "react-router-dom";

function MobileMenu({links, open, toggleMobileMenu, closeMenus}) {
    return (
        <div className="lg:hidden mr-2">
            <button onClick={toggleMobileMenu} className="p-2 cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round">
                {open ? (
                    <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                    </>
                ) : (
                    <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                    </>
                )}
                </svg>
            </button>

            {open && (
              <div className="fixed inset-x-0 top-16 bottom-0 bg-tl-bg z-30">
                <nav className="flex flex-col px-6 ">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={closeMenus}
                      className="font-display text-4xl text-tl-ink py-5 border-b border-tl-border hover:text-tl-accent">
                        {l.label}
                      </Link>
                  ))}
                </nav>
              </div>
        )}
      </div>
      );
}
export default MobileMenu;