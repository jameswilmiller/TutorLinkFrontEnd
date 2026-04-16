import { useEffect, useRef} from "react";

function LocationAutoComplete({ value, onPlaceSelected}) {
    const containerRef = useRef(null);

    useEffect(() => {
        let autocomplete;
        let handlePlaceSelect;

        async function setupAutocomplete() {
            if (!window.google?.maps || !containerRef.current) {
                return;
            }

            const {PlaceAutocompleteElement} = 
                await window.google.maps.importLibrary("places");

            autocomplete = new PlaceAutocompleteElement({
                includedRegionCodes: ["au"]
            });

            autocomplete.setAttribute("placeholder", "Enter suburb or postcode");

            if (value) {
                autocomplete.value = value;
            }

            handlePlaceSelect = async (event) => {
                try {
                    const place = event.placePrediction.toPlace();

                    await place.fetchFields({
                        fields: ["formattedAddress", "location"],
                    });

                    onPlaceSelected({
                        locationName: place.formattedAddress || "",
                        latitude: place.location?.lat() ?? null,
                        longitude: place.location?.lng() ?? null,
                    });
                
                } catch (error) {
                    console.error("failed to select place", error)
                }
            };

            autocomplete.addEventListener("gmp-select", handlePlaceSelect);

            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(autocomplete);
        }

        setupAutocomplete();

        return () => {
            if (autocomplete && handlePlaceSelect) {
                autocomplete.removeEventListener("gmp-select", handlePlaceSelect);
            }
        };  
    }, [value, onPlaceSelected]);

    return <div ref={containerRef} className="w-full" />;
}
export default LocationAutoComplete;