let googleMapsPromise = null;

export function loadGoogleMaps() {
    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        if (window.google?.maps) {
            resolve(window.google.maps)
            return;
        }

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            reject(new Error("Missing VITE_GOOGLE_MAPS_API_KEY"))
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.google?.maps) {
                resolve(window.google.maps);
            } else {
                reject(new Error("Google Maps loaded, but window.google.maps is missing"))
            }
        };

        script.onerror = () => {
            reject(new Error("Failed to load Google Maps script"))
        };

        document.head.appendChild(script);
    });

    return googleMapsPromise;
}