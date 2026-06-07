import { useState, useEffect, useRef } from "react"
import { loadGoogleMaps } from "../../utils/googleMapsLoader"

function PlacesAutoComplete({ onPlaceSelect, initialValue = "" }) {
    const [query, setQuery] = useState(initialValue)
    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const serviceRef = useRef(null)
    const sessionTokenRef = useRef(null)
    const debounceRef = useRef(null)
    const justSelectedRef = useRef(false)
    useEffect(() => {
        async function init() {
            await loadGoogleMaps()
            await google.maps.importLibrary("places")
            serviceRef.current = new google.maps.places.AutocompleteService()
            sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
        }
        init()
    }, [])

    useEffect(() => {
        if (justSelectedRef.current) {
            justSelectedRef.current = false
            return
        }
        
        if (query.length < 2 || !serviceRef.current) {
            setSuggestions([])
            setShowDropdown(false)
            return
        }

        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            serviceRef.current.getPlacePredictions(
                {
                    input: query,
                    componentRestrictions: { country: "au" },
                    sessionToken: sessionTokenRef.current,
                },
                (predictions, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setSuggestions(predictions)
                        setShowDropdown(true)
                    } else {
                        setSuggestions([])
                    }
                }
            )
        }, 300)

        return () => clearTimeout(debounceRef.current)
    }, [query])

    function handleSelect(prediction) {
        justSelectedRef.current = true
        setQuery(prediction.description)
        setShowDropdown(false)
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
            if (status === "OK" && results[0]) {
                const loc = results[0].geometry.location
                onPlaceSelect?.({
                    locationName: prediction.description,
                    latitude: loc.lat(),
                    longitude: loc.lng(),
                })
            }
        })

        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken()
    }

    function handleChange(e) {
        setQuery(e.target.value)
        if (!e.target.value) {
            onPlaceSelect?.({ locationName: "", latitude: null, longitude: null })
        }
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter suburb or postcode"
                className="w-full text-base md:text-sm outline-none bg-transparent"
            />
            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-tl-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {suggestions.map(prediction => (
                        <li
                            key={prediction.place_id}
                            onClick={() => handleSelect(prediction)}
                            className="px-4 py-3 cursor-pointer hover:bg-tl-bg text-sm text-tl-ink"
                        >
                            {prediction.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PlacesAutoComplete