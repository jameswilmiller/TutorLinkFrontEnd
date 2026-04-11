import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import {useAuth } from "../hooks/useAuth";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const {user, isAuthenticated, logout, loading} = useAuth();
    const navigate = useNavigate();

    const initials = 
        user?.username?.[0]?.toUpperCase() ||
        user?.email?.[0]?.toUpperCase() ||
        "U";
    
    async function handleLogout() {
        try {
            await logout();
            setMenuOpen(false);
            navigate("/")
        } catch (error) {
            console.error("logout failed", error)
        }
    }




    
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

            <div className="mx-auto max-w-[1400px] px-6 lg:px-14">

                <div className="flex h-16 items-center justify-between">

                    {/*left side */}
                    <div className="flex items-center space-x-10">
                        <Link to="/" className="text-xl font-semibold text-gray-600 tracking-tight">
                        TutorLink 
                        </Link>

                        <div className="hidden lg:flex space-x-8">
                            <Link to="/browse"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                            >
                            Find Tutors
                            </Link>


                            <Link to="/bookings"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                            >
                            My Bookings
                            </Link>

                            <Link to="become-a-tutor"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                            Become a Tutor
                            </Link>

                            <Link to="/about"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                            About
                            </Link>
                        </div>
                    </div>

                    {/*right side desktop*/}


                    <div className="hidden lg:flex items-center space-x-6">
                        <Link to="/help"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                        Help
                        </Link>
                        
                        {/*show when logged out*/}
                        {!loading && !isAuthenticated && (
                          <>
                            <Link to="/login"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Log In
                            </Link>

                            <Link to="/signup"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Sign Up
                            </Link>
                          </>
                        )}
                        {!loading && isAuthenticated && (
                            <div className = "flex items-center space-x-4">
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="flex items-center gap-3"
                                    aria-label="Open profile"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-800">
                                        {initials}
                                    </div>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
                                >
                                 Log out
                                </button>

                             </div>
                        )}
                    </div>

                    
                    

                    {/* Hamburger button mobile */}
                    <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
                    aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            //cross
                            <div className="relative w-5 h-5">
                                <span className="absolute inset-0 m-auto h-0.5 w-full bg-black rotate-45"/>
                                <span className="absolute inset-0 m-auto h-0.5 w-full bg-black -rotate-45"/>
                            </div>
                        ) : (
                            //burger
                            <div className="flex flex-col justify-between h-5 w-5">
                                <span className="h-0.5 w-full bg-black" />
                                <span className="h-0.5 w-full bg-black" />
                                <span className="h-0.5 w-full bg-black" />
                            </div>
                        ) }
                    </button> 
                </div>

                {/*dropdown menu */}
                {menuOpen && (
                    <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white px-6 py-2">
                        <div className="flex flex-col space-y-8">
                            <Link to="/browse"
                            onClick={() => setMenuOpen(false)}
                            className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                            Find Tutors
                            </Link>

                            <Link to="/bookings"
                            onClick={() => setMenuOpen(false)}
                            className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                            My Bookings
                            </Link>

                            <Link to="/become-a-tutor"
                            onClick={() => setMenuOpen(false)}
                            className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                            Become a Tutor
                            </Link>

                            <Link to="/about"
                            onClick={() => setMenuOpen(false)}
                            className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                            About
                            </Link>


                            <Link to="/help"
                            onClick={() => setMenuOpen(false)}
                            className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                            Help
                            </Link>


                            {!loading && !isAuthenticated && (
                                <>
                                <Link to="/signin"
                                onClick={() => setMenuOpen(false)}
                                className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                                Login
                                </Link>

                                <Link to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                                Sign up
                                </Link>
                                </>
                            )}
                            

                            {!loading && isAuthenticated && (
                                <>
                                    <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/profile");
                                    }}
                                    className="text-left text-4xl font-semibold tracking-tight text-black hover:text-indigo-600">
                                    Profile
                                    </button>

                                    <button
                                    onClick={handleLogout}
                                    className="text-left text-4xl font-semibold tracking-tight text-black hover:text-indigo-600"
                                    >
                                    Log Out
                                    </button>
                                </>
                            )}
                            
                        </div> 
                    </div>
                    )}
            </div>
        </nav>    
    )
}
export default Navbar;