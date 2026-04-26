import {useState} from "react"
import { useNavigate } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutoComplete"

function SearchCard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [remote, setRemote] = useState(null);
  const [subject, setSubject] = useState("");
  const [sort, setSort] = useState("newest");

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === "true") setRemote(true);
    else if (value === "false") setRemote(false);
    else setRemote(null);
  };

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

    if (remote !== null) {
      params.set("remote", remote);
    }

    params.set("sort", sort);

    navigate(`/browse?${params.toString()}`);
  }
    

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex items-center flex-row bg-white 
    shadow rounded-2xl py-2 mt-15 max-w-full">

        <div className="flex flex-col min-h-15 justify-start max-w-full items-start px-6 gap-2">
            <label className="text-tl-muted text-caption">SUBJECT</label>
            <input 
            type="text" 
            value={subject}
            placeholder="Maths, Guitar, Spanish..." 
            onChange={(e) => setSubject(e.target.value)}
            className="text-body-sm outline-none"
            />
        </div>

        <div className="mx-2 h-15 w-px bg-tl-border shrink-0" />

        <div className="flex flex-col max-w-full items-start px-6 ">
            <label className="text-tl-muted text-caption">WHERE</label>
            <PlacesAutoComplete onPlaceSelect={setLocation}/>
        </div>

        <div className="mx-2 h-15 w-px bg-tl-border shrink-0" />

        <div className="flex flex-col min-h-16 justify-start max-w-full items-start px-6 gap-3">
            <label className="text-tl-muted text-caption">MODE</label>
            <select 
            value={remote ?? "any"} 
            onChange={handleChange}
            className="text-body-sm 
              outline-none 
             cursor-pointer"
            >
                <option value="any">Remote or In Person</option>
                <option value="false">In Person</option>
                <option value="true">Remote</option> 
            </select>
        </div>

        <button
        type="submit"
        className="bg-tl-accent text-white px-8 py-6  rounded-2xl 
        text-body-sm font-medium hover:bg-tl-accent-hover transition cursor-pointer max-w-full"
        >
        Search    
        </button>
        

        
    </form>
  );
}
export default SearchCard;