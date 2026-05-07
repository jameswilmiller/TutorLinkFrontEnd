import Hero from "../components/home/Hero"
import SearchCard from "../components/search/SearchCard"
import CourseBubbles from "../components/home/CourseBubbles";
import HomeStats from "../components/home/HomeStats";
import FeaturedTutors from "../components/home/FeaturedTutors";
import HowItWorks from "../components/home/HowItWorks";
import HomeCTA from "../components/home/HomeCTA";
function HomePage() {



    return (
        <div>
            <div className="px-6 lg:px-14 py-20">
                <div className="max-w-4xl mx-auto text-center">
                <Hero/>
                <SearchCard/>
                <CourseBubbles/>
                </div>
            </div>
            <HomeStats/>
            <FeaturedTutors/>
            <HowItWorks/>
            <HomeCTA/>
        </div>
    )
    
}
export default HomePage;