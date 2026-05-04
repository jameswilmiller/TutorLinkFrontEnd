import { useSearchParams } from "react-router-dom"
import BrowseMode from "../search/BrowseMode"
import BrowseFaculty from "./BrowseFaculty"
function BrowseFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const remoteParam = searchParams.get("remote");
    
    return (
    <div className="hidden lg:flex flex-col gap-10">
        <BrowseFaculty/>
        <BrowseMode/>

        
    </div>
)
}
export default BrowseFilters