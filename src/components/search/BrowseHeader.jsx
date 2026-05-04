import { useSearchParams } from "react-router-dom";

function BrowseHeader({ tutorsCount }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const location = searchParams.get("location");
    const sort = searchParams.get("sort") || "newest";

    function updateSort(event) {
        const params = new URLSearchParams(searchParams);
        params.set("sort", event.target.value);
        setSearchParams(params);
    }


    return (
     <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="font-display text-4xl text-tl-ink">
          All tutors
        </h1>

        <p className="mt-1 text-sm text-tl-muted">
          {tutorsCount} tutors
          {location && (
            <>
              {" "}· {location} · within 20km
            </>
          )}
        </p>
      </div>

      <select
        value={sort}
        onChange={updateSort}
        className="h-11 rounded-xl border border-tl-border bg-white px-4 text-sm outline-none"
      >
        <option value="newest">Newest</option>
        <option value="price_low">Price: low to high</option>
        <option value="price_high">Price: high to low</option>
      </select>
    </div>       

    )
}
export default BrowseHeader