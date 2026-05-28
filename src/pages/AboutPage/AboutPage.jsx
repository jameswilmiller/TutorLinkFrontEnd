import AboutHero from "./AboutHero"
import AboutStats from "./AboutStats"
import AboutValues from "./AboutValues"
import AboutCTA from "./AboutCTA"
import AboutFootnote from "./AboutFootnote"

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