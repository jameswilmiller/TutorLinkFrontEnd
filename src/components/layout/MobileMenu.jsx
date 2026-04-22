import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../hooks/useAuth";


function MobileMenu() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const close = () => setOpen(false);

    async function handleLogout() {
        await logout();
        close();
        navigate("/");
    }
    return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round">
          {open ? (
            <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
          ) : (
            <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
          )}
        </svg>
      </button>
    </div>
    )
}
export default MobileMenu;