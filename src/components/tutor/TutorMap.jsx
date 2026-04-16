import {useEffect, useRef} from "react";

const DEFAULT_CENTER = {lat: -27.4698, lng: 153.0251}; //brisbane

function TutorMap({tutors = []}) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);

    useEffect(() => {
        async function initMap() {
            if (!window.google || !window.google.maps) {
                return;
            }

            const {Map} = await window.google.maps.importLibrary("maps");
            const {Marker} = await window.google.maps.importLibrary("marker");

            //create the map
            const map = new Map(mapRef.current, {
                center: {lat: -27.4698, lng: 153.0251}, //brisbane coords
                zoom: 12,
            });

            //add in the markers
            tutors.forEach((tutor) => {
                if (!tutor.latitude || !tutor.longitude) return;

                const marker = new Marker({
                    position: {
                        lat: tutor.latitude,
                        lng: tutor.longitude,
                    },
                    map,
                });

                marker.addListener("click", () => {
                    alert(`${tutor.firstname} ${tutor.lastname}\n${tutor.subjects}\n$${tutor.hourlyRate}/hr`

                    );
                });
            });
    }
    initMap();
}, [tutors]);

    return (
        <div 
        ref={mapRef} 
        className="w-full h-[400px] rounded-xl border"
        />
        );
  }


export default TutorMap;