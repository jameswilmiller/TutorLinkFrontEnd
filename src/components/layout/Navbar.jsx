import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserMenu from "../layout/UserMenu";
import MobileMenu from "../layout/MobileMenu";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const name =
    user?.firstname ||
    "U";

  const LINKS = [
    {label: 'Browse', href: '/browse'},
    {label: 'Become a Tutor', href: '/become-a-tutor'},
    {label: 'About', href: '/about'},
    {label: 'Help', href: '/help'},
  ]

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("logout failed", error);
    }
  }

  function handleNavigate(path) {
    setMenuOpen(false);
    navigate(path);
  }

 return (
  <header className="fixed top-0 h-16 w-full flex border-b bg-tl-bg/90 border-tl-border shadow-2xs items-center">
    <nav className="max-w-350 w-full mx-auto flex justify-between">
      <a href="/" className="font-display text-2xl text-tl-ink ml-2"> TutorLink </a>

      {/* desktop middle*/}
      <ul className="hidden lg:flex items-center gap-8">
        {LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-tl-ink hover:text-tl-accent transition">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      
      <div className="hidden lg:flex items-center gap-3">
        {isAuthenticated ? ( <UserMenu/> ) : (
        <>
        <a href="/login" className="text-sm text-tl-ink hover:text-tl-accent">Log In</a>
        <a href="/signup" className="btn-primary text-sm">Sign Up</a>
        </>
        )}
      </div>
      
      <MobileMenu links={LINKS}/>
      
    </nav>

  </header>
 )
}
 export default Navbar