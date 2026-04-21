import { Outlet } from  "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

function MainLayout() {
    return (
        <div className="flex">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default MainLayout