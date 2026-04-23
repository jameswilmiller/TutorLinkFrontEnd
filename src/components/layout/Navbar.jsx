import {useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserMenu from "../layout/UserMenu";
import MobileMenu from "../layout/MobileMenu";


function Navbar() {
  
  const {isAuthenticated} = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  const LINKS = [
    {label: 'Browse', href: '/browse'},
    {label: 'Become a Tutor', href: '/become-a-tutor'},
    {label: 'About', href: '/about'},
    {label: 'Help', href: '/help'},
  ]

  const isMobileMenuOpen = openMenu === "mobile-nav";
  const isDesktopProfileOpen = openMenu === "desktop-profile";
  const isMobileProfileOpen = openMenu === "mobile-profile";

  function closeMenus() {
    setOpenMenu(null);
  }

  function toggleMobileMenu() {
    setOpenMenu((current) => 
      current === "mobile-nav" ? null : "mobile-nav"
    );
  }

  function toggleProfileMenu() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    setOpenMenu((current) => {
      const target = isDesktop ? "desktop-profile" : "mobile-profile";
      return current === target ? null : target;
    })
  }
  

 return (
  <header className="top-0 h-16 w-full flex border-b bg-tl-bg/90 border-tl-border shadow-2xs items-center">
    <nav className="max-w-350 w-full mx-auto flex justify-between">
      <Link to="/" className="font-display text-2xl text-tl-ink ml-2">TutorLink</Link>

      {/* desktop middle*/}
      <ul className="hidden lg:flex items-center gap-8">
        {LINKS.map(l => (
          <li key={l.href}>
            <Link to={l.href} className="text-sm text-tl-ink hover:text-tl-accent transition">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex">
        <div className="flex items-center gap-3">
          {isAuthenticated ? ( 
            <UserMenu
            desktopOpen={isDesktopProfileOpen}
            mobileOpen={isMobileProfileOpen}
            toggleProfileMenu={toggleProfileMenu}
            closeMenus={closeMenus}
            />
           ) : (
          <>
          <a href="/login" className="text-sm text-tl-ink hover:text-tl-accent">Log In</a>
          <a href="/signup" className="btn-primary text-sm">Sign Up</a>
          </>
          )}
        </div>
      
        <MobileMenu 
        links={LINKS}
        open={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeMenus={closeMenus} 
        />
      </div>
    </nav>

  </header>
 )
}
 export default Navbar