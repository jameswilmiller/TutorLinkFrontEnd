import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { sendPasswordResetCode } from "../services/authService"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"

function ForgotPasswordPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await sendPasswordResetCode(email)
            navigate("/reset-password", {
                state: {
                    email,
                    message: "If an account exists for that email, a reset code has been sent.",
                },
            })
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg flex items-center justify-center px-6 py-20">
            <AuthForm
                title="Forgot your password?"
                subtitle="Enter your email and we'll send you a reset code."
                centered
                footer={
                        <Link to="/login" className="font-medium text-tl-ink text-center hover:text-tl-muted">Back to login</Link>

                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AuthInput
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-tl-accent py-3 font-medium text-white hover:bg-tl-accent-hover disabled:opacity-70 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        {loading ? "Sending..." : "Send reset code"}
                    </button>
                </form>
            </AuthForm>
        </div>
    )
}

export default ForgotPasswordPage