import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";
import BrowseSearchCard from "../components/search/BrowseSearchCard"
function BrowsePage() {
  const [searchParams] = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTutors() {
      try {
        setLoading(true);
        setError("");
        const remoteParam = searchParams.get("remote");
        const filters = {
          subject: searchParams.get("subject") || "",
          location: searchParams.get("location") || "",
          latitude: searchParams.get("latitude") || "",
          longitude: searchParams.get("longitude") || "",
          remote: remoteParam === null ? null : remoteParam === "true",
          sort: searchParams.get("sort") || "newest",
        };
        const data = await fetchTutors(filters);
        setTutors(data);
      } catch (err) {
        setError(err.message || "Failed to load tutors");
      } finally {
        setLoading(false);
      }
    }

    loadTutors();
  }, [searchParams]);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p>{error}</p>;

  return (
  
            <BrowseSearchCard/>
         
  )
}
export default BrowsePage;