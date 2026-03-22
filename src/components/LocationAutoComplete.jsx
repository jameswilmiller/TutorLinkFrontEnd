import { useEffect, useRef} from "react";

function LocationAutoComplete({value, onPlaceSelected}) {
    const containerRef = useRef(null);

    useEffect(() => {
        async function setupAutocomplete() {
            if (!window.google?.maps || !containerRef.current) {
                return;
            }
        
        const { PlaceAutocompleteElement } = 
            await google.maps.importLibrary("places");

        const autocomplete = new PlaceAutocompleteElement({
            includedRegionCodes: ["au"],
        })

        autocomplete.setAttribute("placeholder", "enter suburb or postcode")

        const handlePlaceSelect = async(event) => {
            const place = event.placePrediction.toPlace();

            await place.fetchFields({
                fields: ["formattedAddress", "location"]
            });

            onPlaceSelected({
                locationName: place.formattedAdress || "",
                latitude: place.location?.lat() ?? null,
                longitude: place.location?.lng() ?? null,
            });
        }

        autocomplete.addEventListener("gmp-select", handlePlaceSelect);

        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(autocomplete);

        return () => {
            autocomplete.removeEventListener("gmp-select", handlePlaceSelect);
        };
      }

      
    })


    

}