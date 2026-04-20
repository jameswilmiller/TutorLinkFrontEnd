import { useEffect, useState } from "react";
import {useApiClient} from "../hooks/useApiClient"
import { useNavigate } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";

import Button from "../components/ui/Button/Button"
function HomePage() {
    const api = useApiClient();
    const navigate = useNavigate();

    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

   
    function handleSearchResults(results, filters) {
        navigate("/browse", {
            state: {filters},
        });
    }


    return (
        
        <div className="container">
            <Button variant="secondary">Secondary</Button>
            <Button>Primary</Button>
            <Button variant="tertiary">Tertiary</Button>
        </div>
    )
    
}
export default HomePage;