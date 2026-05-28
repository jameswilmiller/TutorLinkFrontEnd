import { useSearchParams } from "react-router-dom"

function BrowseHeader({ tutorsCount }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = searchParams.get("location")
    const sort = searchParams.get("sort") || "rating"

    function updateSort(event) {
        const params = new URLSearchParams(searchParams)
        params.set("sort", event.target.value)
        params.delete("page")
        setSearchParams(params)
    }

    return (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
                <h1 className="font-display text-3xl md:text-4xl text-tl-ink">All tutors</h1>
                <p className="mt-1 text-sm text-tl-muted">
                    {tutorsCount} tutors found
                    {location && <> · {location} · within 20km</>}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-tl-muted">Sort by:</span>
                <select
                    value={sort}
                    onChange={updateSort}
                    className="h-10 rounded-xl border border-tl-border bg-white px-3 text-sm outline-none cursor-pointer"
                >
                    <option value="rating">Highest rated</option>
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: low to high</option>
                    <option value="price_high">Price: high to low</option>
                </select>
            </div>
        </div>
    )
}

export default BrowseHeader