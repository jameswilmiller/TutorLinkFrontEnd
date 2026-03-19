import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import tutorsData from "../data/tutorsData"
import { fetchTutors } from "../services/tutorService";
import Navbar from "../components/temp";

function HomePage() {

    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTutors() {
            try {
                const data = await fetchTutors();
                console.log("Fetched Tutors:", data);
                setTutors(tutorsData);
            } catch(err) {
                console.error(err);
                setError("failed to load tutors");
            } finally {
                setLoading(false);
            }
        }

        loadTutors();
    }, [])

    
    
   
    return (
        <div></div>

    );
}
export default HomePage;