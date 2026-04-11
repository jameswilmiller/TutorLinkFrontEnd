import {Outlet, Link} from "react-router-dom"

function AuthLayout() {
    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className = "bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-14">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                        to="/"
                        className="text-xl font-semibold text-gray-600 tracking-tight">
                            TutorLink
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-6">
                <div className="w-full max-w-md">

                    <Outlet/>
                </div>

            </main>
        </div>


        
      
    )
}
export default AuthLayout