import { useEffect, useRef } from "react";

function LocationAutoComplete({ value = "", onPlaceSelected }) {
    const containerRef = useRef(null);
    const autocompleteRef = useRef(null);
    const onPlaceSelectedRef = useRef(onPlaceSelected);

    useEffect(() => {
        onPlaceSelectedRef.current = onPlaceSelected;
    }, [onPlaceSelected]);

    useEffect(() => {
        let isMounted = true;
        let handlePlaceSelect;

        async function setupAutocomplete() {
            if (!containerRef.current || autocompleteRef.current) {
                return;
            }

            if (!window.google?.maps) {
                console.error("Google Maps is not loaded");
                return;
            }

            const { PlaceAutocompleteElement } =
                await window.google.maps.importLibrary("places");

            if (!isMounted || !containerRef.current) {
                return;
            }

            const autocomplete = new PlaceAutocompleteElement({
                includedRegionCodes: ["au"],
            });

            autocomplete.setAttribute("placeholder", "Enter suburb or postcode");

            if (value) {
                autocomplete.value = value;
            }

            handlePlaceSelect = async (event) => {
                try {
                    const placePrediction = event.placePrediction;

                    if (!placePrediction) {
                        return;
                    }

                    const place = placePrediction.toPlace();

                    await place.fetchFields({
                        fields: ["formattedAddress", "location"],
                    });

                    onPlaceSelectedRef.current?.({
                        locationName: place.formattedAddress || "",
                        latitude: place.location?.lat() ?? null,
                        longitude: place.location?.lng() ?? null,
                    });
                } catch (error) {
                    console.error("Failed to select place", error);
                }
            };

            autocomplete.addEventListener("gmp-select", handlePlaceSelect);

            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(autocomplete);

            autocompleteRef.current = {
                element: autocomplete,
                handlePlaceSelect,
            };
        }

        setupAutocomplete();

        return () => {
            isMounted = false;

            if (autocompleteRef.current) {
                const { element, handlePlaceSelect } = autocompleteRef.current;
                element.removeEventListener("gmp-select", handlePlaceSelect);
                autocompleteRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const autocomplete = autocompleteRef.current?.element;

        if (!autocomplete) {
            return;
        }

        if (value && autocomplete.value !== value) {
            autocomplete.value = value;
        }

        if (!value && autocomplete.value) {
            autocomplete.value = "";
        }
    }, [value]);

    return <div ref={containerRef} className="w-full" />;
}

export default LocationAutoComplete;