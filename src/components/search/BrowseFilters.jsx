import BrowseFaculty from "./BrowseFaculty"
import BrowseMode from "./BrowseMode"

function BrowseFilters() {
    return (
        <div className="hidden lg:flex flex-col gap-8 bg-white border-r border-tl-border p-6 min-h-[calc(100vh-4rem)]">
            <BrowseFaculty />
            <BrowseMode />
        </div>
    )
}

export default BrowseFilters