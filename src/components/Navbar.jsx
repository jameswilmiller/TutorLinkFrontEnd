import {Link} from "react-router-dom"
import {useState} from "react"
function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);



    
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex h-16 items-center justify-between">

                    {/*left side */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-lg font-semibold text-indigo-600">
                        TutorLink 
                        </Link>

                        <div className="hidden md:flex space-x-6">
                            

                    
                 

                        



                        

                    </div>
                </div>
            </div>
        </nav>    
    )
}
export default Navbar;