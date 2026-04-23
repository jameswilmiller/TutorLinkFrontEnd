import {Link} from "react-router-dom"

function DesktopProfile({closeMenus, handleLogout, menuItems, user}) {
    return(    
    <div 
    className="hidden lg:flex flex-col absolute right-0 top-full w-90
     overflow-hidden rounded-3xl border border-tl-border bg-tl-surface shadow-2xl"
     >
        <div className="flex justify-between px-5 pt-5 pb-4 items-center">
            <div>
                <p className="font-display text-3xl">{user?.firstname}</p>
                <p className="text-tl-muted">{user?.email}</p>  
            </div>

            <img src="/default-avatar.png" alt="Profile"
            className="h-16 w-16 rounded-full border border-tl-border bg-tl-bg"/>   
        </div>
        <div className="h-px bg-tl-border"/>
        <ul className="flex-col py-2 w-full">
            {menuItems.map(i => (
            <li key={i.href}>
                <Link to={i.href} className="block px-4 py-2  text-tl-ink hover:bg-tl-bg">
                {i.label}
                </Link>
            </li>
            ))}

            <Link 
            onClick={handleLogout}
            className="block px-4 py-2 mt-3 rounded-2xl mx-2 text-red-400 text-center bg-tl-bg hover:bg-neutral-200 ">
            Log Out
            </Link>
        </ul>
    </div>
        
    )
}
export default DesktopProfile;