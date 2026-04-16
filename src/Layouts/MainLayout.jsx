import { Outlet } from  "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            <main className="flex-grow">
                <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
                <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default MainLayout