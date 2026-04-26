import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutoComplete";

function BrowseSearchCard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [location, setLocation] = useState({
    locationName: searchParams.get("location") || "",
    latitude: searchParams.get("latitude") || "",
    longitude: searchParams.get("longitude") || "",
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  function handleSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (subject.trim()) {
      params.set("subject", subject.trim());
    }

    if (location?.locationName) {
      params.set("location", location.locationName);
    }

    if (location?.latitude) {
      params.set("latitude", location.latitude);
    }

    if (location?.longitude) {
      params.set("longitude", location.longitude);
    }

    params.set("sort", sort);

    setSearchParams(params);
  }

  return (
    <div className="w-full bg-white py-5 border-b border-tl-border">
        <div className="max-w-350 mx-auto px-6">
            <form
            onSubmit={handleSubmit}
            className="flex items=center gap-3 items-center">
                <input
                type="text"
                value={subject}
                placeholder="Search subjects..."
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 border h-14 px-4 border-tl-border rounded-xl outline-none"
                />

                <div className="w-70 h-14 px-3 border border-tl-border rounded-xl flex items-center overflow-hidden">
                    <PlacesAutoComplete onPlaceSelect={setLocation}/>
                </div>

                <button
                type="submit"
                className=" h-12 px-6 bg-tl-accent text-white rounded-xl hover:bg-tl-accent-hover cursor-pointer">
                    Search
                </button>
            </form>
        </div>  
    </div>
  );
}

export default BrowseSearchCard;