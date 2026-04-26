import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../../utils/googleMapsLoader";

function PlacesAutocomplete({ onPlaceSelect }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let autocompleteElement = null;
    let isMounted = true;

    async function setupAutocomplete() {
      try {
        await loadGoogleMaps();
        await google.maps.importLibrary("places");

        if (!isMounted || !containerRef.current) return;

        autocompleteElement =
          new google.maps.places.PlaceAutocompleteElement({
            placeholder: "Enter suburb or postcode",
          });

        autocompleteElement.includedRegionCodes = ["au"];

        autocompleteElement.addEventListener(
          "gmp-select",
          async ({ placePrediction }) => {
            const place = placePrediction.toPlace();

            await place.fetchFields({
              fields: ["formattedAddress", "location"],
            });

            onPlaceSelect?.({
              locationName: place.formattedAddress,
              latitude: place.location?.lat(),
              longitude: place.location?.lng(),
            });
          }
        );

        containerRef.current.appendChild(autocompleteElement);
      } catch (error) {
        console.error("Autocomplete setup failed:", error);
      }
    }

    setupAutocomplete();

    return () => {
      isMounted = false;

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [onPlaceSelect]);

  return <div ref={containerRef} className="w-60" />;
}

export default PlacesAutocomplete;