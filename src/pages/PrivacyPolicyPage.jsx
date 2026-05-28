import { privacyPolicyHtml } from "../content/privacyPolicy"

function PrivacyPolicyPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg px-6 py-16">
            <div
                className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm"
                dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
            />
        </div>
    )
}

export default PrivacyPolicyPage