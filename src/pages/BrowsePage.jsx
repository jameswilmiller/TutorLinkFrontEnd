import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchTutors } from "../services/tutorService";
import BrowseSearchCard from "../components/search/BrowseSearchCard"
import BrowseFilters from "../components/search/BrowseFilters";
import BrowseHeader from "../components/search/BrowseHeader"
import TutorGrid from "../components/tutor/TutorGrid"

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
          courseCode: searchParams.get("courseCode") || "",
          faculty: searchParams.get("faculty") || "",
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

  return (
    <div className="bg-tl-bg">
      <BrowseSearchCard/>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10 mx-auto">
        <BrowseFilters />
        <section className="px-8 py-6">
          <BrowseHeader tutorsCount={tutors.length}/>
          {loading && <p>Loading tutors...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <TutorGrid tutors={tutors} />}
        </section>
      </div>
    </div>
  )
}

export default BrowsePage;