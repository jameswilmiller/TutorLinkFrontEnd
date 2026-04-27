import { useSearchParams } from "react-router-dom"

function BrowseMode() {
    const [searchParams, setSearchParams] = useSearchParams();
    const remoteParam = searchParams.get("remote");
    const mode = remoteParam == null ? "all" : remoteParam === "true" ? "online" : "in-person";

    function updateMode(nextMode) {
        const params = new URLSearchParams(searchParams);
        if (nextMode == "all") {
            params.delete("remote")
        }

        if (nextMode == "online") {
            params.set("remote", "true");
        }

        if (nextMode == "in-person") {
            params.set("remote", "false");
        }

        setSearchParams(params);
    }
    
    return (
        <section>
             <p className="mb-2 text-heading-xs font-semibold tracking-wide text-tl-muted">
                MODE
             </p>
             <div className="flex flex-col">
                <label className="flex items-center gap-2">
                    <input 
                    type="radio"
                    name="mode"
                    checked={mode === "all"}
                    onChange={() => updateMode("all")}
                    className="accent-tl-accent"
                    />
                All
                </label>
                <label className="flex items-center gap-2">
                    <input 
                    type="radio"
                    name="mode"
                    checked={mode === "online"}
                    onChange={() => updateMode("online")}
                    className="accent-tl-accent"
                    />
                Online
                </label>
                <label className="flex items-center gap-2">
                    <input 
                    type="radio"
                    name="mode"
                    checked={mode === "in-person"}
                    onChange={() => updateMode("in-person")}
                    className="accent-tl-accent"
                    />
                In-person
                </label>  
             </div>
        </section>
)
}
export default BrowseMode