import { useSearchParams } from "react-router-dom"

const MODES = [
    { label: "All", value: "all" },
    { label: "Online", value: "online" },
    { label: "In-person", value: "in-person" },
]

function BrowseMode() {
    const [searchParams, setSearchParams] = useSearchParams()
    const remoteParam = searchParams.get("remote")
    const mode = remoteParam == null ? "all" : remoteParam === "true" ? "online" : "in-person"

    function updateMode(nextMode) {
        const params = new URLSearchParams(searchParams)
        if (nextMode === "all") params.delete("remote")
        else if (nextMode === "online") params.set("remote", "true")
        else if (nextMode === "in-person") params.set("remote", "false")
        params.delete("page")
        setSearchParams(params)
    }

    return (
        <section>
            <p className="mb-2 text-xs font-semibold tracking-wide text-tl-muted uppercase">
                Mode
            </p>
            <div className="flex flex-col gap-1">
                {MODES.map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="mode"
                            checked={mode === option.value}
                            onChange={() => updateMode(option.value)}
                            className="accent-tl-accent"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </section>
    )
}

export default BrowseMode