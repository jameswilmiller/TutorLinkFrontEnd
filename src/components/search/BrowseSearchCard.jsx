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
    <div className="w-full bg-white py-10 shadow-sm border-b border-tl-border">
        
    </div>
  );
}

export default BrowseSearchCard;