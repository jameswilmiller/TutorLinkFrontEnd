import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button/Button";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const initials =
    user?.username?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("logout failed", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          <Link to="/" className="navbar__brand">
            TutorLink
          </Link>

          <div className="navbar__links">
            <Link to="/browse" className="navbar__link">
              Find Tutors
            </Link>
            <Link to="/bookings" className="navbar__link">
              My Bookings
            </Link>
            <Link to="/become-a-tutor" className="navbar__link">
              Become a Tutor
            </Link>
            <Link to="/about" className="navbar__link">
              About
            </Link>
          </div>
        </div>

        <div className="navbar__right navbar__right-desktop">
          <Link to="/help" className="navbar__link">
            Help
          </Link>

          {!loading && !isAuthenticated && (
            <>
              <Link to="/login" className="navbar__link">
                Log in
              </Link>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </>
          )}

          {!loading && isAuthenticated && (
            <div className="navbar__profile">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                aria-label="Open profile"
                className="navbar__avatar"
              >
                {initials}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="navbar__link"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="navbar__menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile">
          <Link
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className="navbar__mobile-link"
          >
            Find Tutors
          </Link>

          <Link
            to="/bookings"
            onClick={() => setMenuOpen(false)}
            className="navbar__mobile-link"
          >
            My Bookings
          </Link>

          <Link
            to="/become-a-tutor"
            onClick={() => setMenuOpen(false)}
            className="navbar__mobile-link"
          >
            Become a Tutor
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="navbar__mobile-link"
          >
            About
          </Link>

          <Link
            to="/help"
            onClick={() => setMenuOpen(false)}
            className="navbar__mobile-link"
          >
            Help
          </Link>

          {!loading && !isAuthenticated && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="navbar__mobile-link"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="navbar__mobile-link"
              >
                Sign up
              </Link>
            </>
          )}

          {!loading && isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="navbar__mobile-link"
              >
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="navbar__mobile-link"
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;