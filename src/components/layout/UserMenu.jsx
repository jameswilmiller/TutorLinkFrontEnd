import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DesktopProfile from "../layout/DesktopProfile"
import MobileProfile from "./MobileProfile";

function UserMenu({
  desktopOpen,
  mobileOpen,
  toggleProfileMenu,
  closeMenus,
  
}) {
  
  const { user, logout } = useAuth();
  const name = user?.firstname || "U";
  const ref = useRef();
  const navigate = useNavigate();
  const isOpen = desktopOpen || mobileOpen;

  const menuItems = [
    {label: "My profile", href: "/profile"},
    {label: "My Bookings", href: "/bookings"},
    {label: "Settings", href: "/settings" }
  ]
  useEffect(() => {

    if (!desktopOpen) return

    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeMenus();
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeMenus, desktopOpen]);

  async function handleLogout() {
    await logout();
    closeMenus();
    navigate("/");
  }

  return (
      <div ref={ref} className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-full
          bg-tl-accent text-white text-sm hover:bg-tl-accent-hover cursor-pointer
          mr-2"
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
            className={desktopOpen || mobileOpen ? "rotate-180 transition" : "transition"}
          >
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </button>

      {desktopOpen && (
        <DesktopProfile 
        closeMenus={closeMenus} 
        handleLogout={handleLogout} 
        menuItems={menuItems}
        user={user}/>
      )}

      {mobileOpen && (
        <MobileProfile
        closeMenus={closeMenus}
        handleLogout={handleLogout}
        menuItems={menuItems}
        user={user}
        />
      )}
      </div>
  );
}

export default UserMenu;