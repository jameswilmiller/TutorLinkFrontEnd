import { useSearchParams } from "react-router-dom"
import BrowseMode from "../search/BrowseMode"
import BrowseFaculty from "./BrowseFaculty"
function BrowseFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const remoteParam = searchParams.get("remote");
    
    return (
    <div className="hidden lg:flex flex-col gap-8 bg-white border-r border-tl-border p-6 self-start h-full">
        <BrowseFaculty/>
        <BrowseMode/>

        
    </div>
)
}
export default BrowseFilters