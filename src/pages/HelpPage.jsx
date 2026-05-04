import HelpHero from "../components/help/HelpHero"
import HelpFAQ from "../components/help/HelpFAQ"
import HelpContact from "../components/help/HelpContact"

function HelpPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">
            <HelpHero />
            <HelpFAQ />
            <HelpContact />
        </div>
    )
}

export default HelpPage