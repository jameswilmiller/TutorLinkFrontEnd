import Hero from "../components/home/Hero"
import SearchCard from "../components/search/SearchCard"
import CourseBubbles from "../components/home/CourseBubbles";
function HomePage() {



    return (
        
         <div className="px-6 lg:px-14 py-20">
            <div className="max-w-4xl mx-auto text-center">
            <Hero/>
            <SearchCard/>
            <CourseBubbles/>
            </div>
        </div>
    )
    
}
export default HomePage;