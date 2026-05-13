import AboutHero from "../components/about/AboutHero"
import AboutStats from "../components/about/AboutStats"
import AboutValues from "../components/about/AboutValues"
import AboutCTA from "../components/about/AboutCTA"
import AboutFootnote from "../components/about/AboutFootnote"

function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">
            <AboutHero />
            <AboutStats />
            <AboutValues />
            <AboutCTA />
            <AboutFootnote />
        </div>
    )
}

export default AboutPage