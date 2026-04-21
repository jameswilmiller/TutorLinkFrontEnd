import { useEffect, useState } from "react";
import {useApiClient} from "../hooks/useApiClient"
import { useNavigate } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";


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
        
         <div></div>
    )
    
}
export default HomePage;