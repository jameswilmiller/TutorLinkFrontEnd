import { useSearchParams } from "react-router-dom"
import BrowseMode from "../search/BrowseMode"
import BrowseSubject from "../search/BrowseSubject"
function BrowseFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const remoteParam = searchParams.get("remote");
    
    return (
    <div className="hidden lg:flex flex-col gap-10">
        <BrowseSubject/>
        <BrowseMode/>

        
    </div>
)
}
export default BrowseFilters