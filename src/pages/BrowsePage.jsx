import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";
import BrowseSearchCard from "../components/search/BrowseSearchCard"
import BrowseFilters from "../components/search/BrowseFilters";
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
          <div>
            <BrowseSearchCard/>
              <div className="mx-auto max-w-300 px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
                <BrowseFilters />
                <section>
                  <div>this is where my tutor grid header will go</div>
                  <div>this is where my tutors grid will go</div>
                </section>

              </div>
          
          
          </div>
            
         
  )
}
export default BrowsePage;