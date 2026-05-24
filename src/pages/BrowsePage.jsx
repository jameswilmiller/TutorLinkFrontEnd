import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchTutors } from "../services/tutorService"
import BrowseSearchCard from "../components/search/BrowseSearchCard"
import BrowseFilters from "../components/search/BrowseFilters"
import BrowseHeader from "../components/search/BrowseHeader"
import TutorGrid from "../components/tutor/TutorGrid"
import Pagination from "../components/common/Pagination"

const PAGE_SIZE = 12

function BrowsePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [tutors, setTutors] = useState([])
    const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPages: 0, totalElements: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadTutors() {
            try {
                setLoading(true)
                setError("")
                const remoteParam = searchParams.get("remote")
                const filters = {
                    courseCode: searchParams.get("courseCode") || "",
                    faculty: searchParams.get("faculty") || "",
                    location: searchParams.get("location") || "",
                    latitude: searchParams.get("latitude") || "",
                    longitude: searchParams.get("longitude") || "",
                    remote: remoteParam === null ? null : remoteParam === "true",
                    sort: searchParams.get("sort") || "rating",
                    page: parseInt(searchParams.get("page") || "0", 10),
                    size: PAGE_SIZE,
                }
                const data = await fetchTutors(filters)
                setTutors(data.tutors)
                setPageInfo({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                })
            } catch (err) {
                setError(err.message || "Failed to load tutors")
            } finally {
                setLoading(false)
            }
        }
        loadTutors()
    }, [searchParams])

    function handlePageChange(newPage) {
        const params = new URLSearchParams(searchParams)
        if (newPage === 0) {
            params.delete("page")
        } else {
            params.set("page", String(newPage))
        }
        setSearchParams(params)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="bg-tl-bg">
            <BrowseSearchCard />
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10 mx-auto">
                <BrowseFilters />
                <section className="px-6 lg:px-8 py-6">
                    <BrowseHeader tutorsCount={pageInfo.totalElements} />

                    {loading && <p className="text-sm text-tl-muted">Loading tutors...</p>}

                    {error && (
                        <p role="alert" className="text-sm text-red-500">{error}</p>
                    )}

                    {!loading && !error && tutors.length === 0 && (
                        <p className="text-sm text-tl-muted">No tutors found. Try adjusting your filters.</p>
                    )}

                    {!loading && !error && tutors.length > 0 && (
                        <>
                            <TutorGrid tutors={tutors} />
                            <Pagination
                                currentPage={pageInfo.currentPage}
                                totalPages={pageInfo.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default BrowsePage