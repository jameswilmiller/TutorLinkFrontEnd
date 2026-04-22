import { useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

function UserMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const name = user?.firstname || "U";

    useEffect(() => {
        function handler(e) {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    async function handleLogout() {
        await logout();
        setOpen(false);
        navigate("/");
  }

  return (
    <div ref={ref} className="relative mr-2">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-tl-ink text-white text-sm hover:opacity-90 transition"
      >
        <span>{name}</span>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 8 10 12 14 8" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-tl-border bg-white shadow-lg overflow-hidden">
          <Link to="/profile" onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-tl-ink hover:bg-tl-bg/60">
            Manage account
          </Link>
          <Link to="/activity" onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-tl-ink hover:bg-tl-bg/60">
            Activity
          </Link>
          <button onClick={handleLogout}
            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-tl-border">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
export default UserMenu;