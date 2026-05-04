import AboutHero from "../components/about/AboutHero"
import AboutStats from "../components/about/AboutStats"
import AboutCTA from "../components/about/AboutCTA"
import AboutFootnote from "../components/about/AboutFootnote"

function AboutPage() {
    return (
        <div className="max-w-350 mx-auto px-6 py-20 space-y-20">
            <AboutHero />
            <AboutStats />
            <AboutCTA />
            <AboutFootnote />
        </div>
    )
}

export default AboutPage