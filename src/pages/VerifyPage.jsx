import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { resendVerificationCode, verifyUser } from "../services/authService"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"
import { toFieldErrorMap } from "../utils/formErrors"

function VerifyPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ""
    const redirect = location.state?.redirect || "/"
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [message, setMessage] = useState(location.state?.message || "")

    function handleCodeChange(e) {
        setCode(e.target.value)
        if (fieldErrors.verificationCode) {
            setFieldErrors(prev => ({ ...prev, verificationCode: undefined }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        setFieldErrors({})

        try {
            await verifyUser({ email, verificationCode: code })
            navigate("/login", {
                    state: {
                        email,
                        message: "Email verified successfully. Now you can log in",
                        redirect,
                    },
            })
        } catch (err) {
            if (err.fieldErrors?.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))
            } else {
                setError(err.message || "Verification failed")
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleResend() {
        setError("")
        setMessage("")

        try {
            await resendVerificationCode(email)
            setMessage("Verification code resent. Please check your email.")
        } catch (err) {
            setError(err.message || "Resend verification failed")
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg flex items-center justify-center px-6 py-20">
            <AuthForm
                title="Verify your email"
                subtitle={<>Enter the verification code sent to <strong className="text-tl-ink">{email}</strong></>}
                centered
                footer={
                    <button
                        onClick={handleResend}
                        className="text-sm font-medium text-tl-muted hover:text-tl-ink transition w-full text-center"
                    >
                        Resend code
                    </button>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <p role="status" className="text-sm text-green-600">{message}</p>}

                    <AuthInput
                        name="verificationCode"
                        type="text"
                        placeholder="Enter your verification code"
                        value={code}
                        onChange={handleCodeChange}
                        error={fieldErrors.verificationCode}
                        autoComplete="one-time-code"
                        required
                    />

                    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-tl-accent py-3 font-medium text-white hover:bg-tl-accent-hover disabled:opacity-70 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </AuthForm>
        </div>
    )
}

export default VerifyPage