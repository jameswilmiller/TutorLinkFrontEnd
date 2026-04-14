import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import {useApiClient} from "../hooks/useApiClient"


import SearchCard from "../components/SearchCard"
import TutorMap from "../components/TutorMap"
import { useNavigate } from "react-router-dom";

function HomePage() {
    const api = useApiClient();
    const navigate = useNavigate();

    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

   
    useEffect(() => {
        async function loadTutors() {
            try {
                const data = await api.get("/tutors");
                setTutors(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load tutors");
            } finally {
                setLoading(false);
            }
        }
        loadTutors();
    }, []);

    function handleSearchResults(results, filters) {
        navigate("/browse", {
            state : {
                tutors: results,
                filters,
            },
        });
    }
    
    
   
    return (
        <div>
            {/* top half */}
            <section className="py-10 lg:py-14">
                <div className = "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
                    {/*left side */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                Find tutors near you
                            </p>

                            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Book the right tutor for any subject
                            </h1>

                            <p className="max-w-lg text-lg leading-8 text-gray-600">
                                Search by subject,level,time and location to find trusted tutors nearby or online.
                            </p>
                        </div>
                        <SearchCard onSearchResults={handleSearchResults}/>
                    </div>
                    {/*right side */}
                    <div className="space-y-4">
                        <div className = "space-y-2">
                            <h2 className = "text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                                Nearby Tutors
                            </h2>

                            <p className="text-base text-gray-600">
                                Explore tutor locations and ratings on the map
                            </p>
                        </div>
                        <TutorMap tutors={tutors}/>
                    </div>
                </div>
            </section>

            {/*lower half */}
            <section className="pb-14 lg:pb-20">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Top Rated Tutors
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Featured Tutors
                        </h2>
                    </div>
                </div>
                {loading ? 
                    (
                    <p>Loading tutors...</p>
                    ) : error ? 
                        (
                        <p className="text-red-600"> {error}</p>
                    ) : (<Carousel tutors = {tutors}/>

                    )}
            </section>
        </div>

    );
}
export default HomePage;