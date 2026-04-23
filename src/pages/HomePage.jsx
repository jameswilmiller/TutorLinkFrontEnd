import Hero from "../components/ui/Hero"
import SearchCard from "../components/search/SearchCard"
import SubjectBubbles from "../components/ui/SubjectBubbles";
function HomePage() {



    return (
        
         <div className="px-6 lg:px-14 py-20">
            <div className="max-w-4xl mx-auto text-center">
            <Hero/>
            <SearchCard/>
            <SubjectBubbles/>
            </div>
        </div>
    )
    
}
export default HomePage;