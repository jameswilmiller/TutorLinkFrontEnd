import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const name =
    user?.firstname ||
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

  function handleNavigate(path) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <div className="fixed top-0 h-16 w-full flex border-b bg-white border-gray-100 shadow-2xs items-center">
      <div className="max-w-350 w-full flex mx-auto justify-between">
        <div className="flex gap-8 items-center">
          <Link to="/" className="font-bold text-2xl ml-4 text-gray-700"> TutorLink </Link>
          <nav className="hidden lg:flex items-center gap-4 font-semibold text-gray-500 text-sm">
            <Link to="/browse" className="rounded-full hover:bg-gray-100 px-4 py-2"> Find Tutors </Link>
            <Link to="/bookings" className="rounded-full hover:bg-gray-100 px-4 py-2"> My Bookings </Link>
            <Link to="/become-a-tutor" className="rounded-full hover:bg-gray-100 px-4 py-2"> Become a Tutor </Link>
            <Link to="/about" className="rounded-full hover:bg-gray-100 px-4 py-2"> About </Link>
          </nav>
        </div>
        {/*right side desktop logged out */}
        {!loading && !isAuthenticated && (
        <nav className="hidden lg:flex items-center gap-2 font-semibold text-gray-500 text-sm">
            <Link to="/help" className="rounded-full hover:bg-gray-100 px-4 py-2"> Help </Link>
            <Link to="/login" className="rounded-full hover:bg-gray-100 px-4 py-2"> Log In </Link>
            <Link to="/signup" className="text-white bg-primary-500 hover:bg-primary-400 px-4 py-2 rounded-full mr-4 "> Sign Up </Link> 
        </nav> 
        )}
        {/*right side desktop logged in */}
        {!loading && isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-4 font-semibold text-gray-500 text-sm">
              <Link to="/help" className="rounded-full hover:bg-gray-100 px-4 py-2">Help</Link>
              <button onClick={handleLogout} className="rounded-full hover:bg-gray-100 px-4 py-2" >
                Log Out
              </button>
              
              <button onClick={() => navigate("/profile")} className="text-white bg-primary px-4 py-2 rounded-full hover:opacity-80 transition mr-4">
                {name}
              </button>
          </nav>
        )}
        {/* top right mobile */}

        <div className="mr-4 flex items-center gap-2 lg:hidden font-semibold text-gray-500 text-sm"> 
          {!loading && !isAuthenticated && (
            <>
              <Link
              to="login"
              className="rounded-full hover:bg-gray-100 px-3 py-2">
              Log in
              </Link>
              <Link
              to="signup"
              className="text-white bg-primary-500 hover:bg-primary-400 px-4 py-2 rounded-full mr-4 ">
              Sign up
              </Link>
            </>
          )} 
          
          {!loading && isAuthenticated && (
            <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/profile");
            }}
            className="text-white bg-primary px-4 py-2 rounded-full hover:bg-gray-100 transition">
              {name}
            </button>
          )}
          <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-6 h-6 flex items-center justify-center">
            {menuOpen ? (
              <div className="relative w-5 h-5">
                <span className="absolute inset-0 m-auto h-0.5 w-full bg-black rotate-45"/>
                <span className="absolute inset-0 m-auto h-0.5 w-full bg-black -rotate-45"/>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-5 w-5">
                <span className="h-0.5 w-full bg-black" />
                <span className="h-0.5 w-full bg-black" />
                <span className="h-0.5 w-full bg-black" />
              </div>
            )}
          </button> 
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-white px-6 py-6 ">
          <nav className="flex flex-col space-y-6">
            <Link
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold text-gray-500 hover:text-gray-300">
              Find Tutors
            </Link>
            <Link
            to="/bookings"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold text-gray-500 hover:text-gray-300">
              My Bookings
            </Link>
            <Link
            to="/become-a-tutor"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold text-gray-500 hover:text-gray-300">
              Become a Tutor
            </Link>
            <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold text-gray-500 hover:text-gray-300">
              About
            </Link>
            <Link
            to="/help"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold text-gray-500 hover:text-gray-300">
              Help
            </Link>
            {!loading && isAuthenticated && (
              <button
              onClick={handleLogout}
              className="text-left text-3xl font-semibold text-gray-500 hover:text-gray-400">
                Log Out
              </button>
            )}
          </nav>

        </div>
      )}
    </div>
    
    
  )
}
  export default Navbar;