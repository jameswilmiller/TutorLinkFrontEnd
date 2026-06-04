import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { resetPassword } from "../services/authService"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"
import { toFieldErrorMap } from "../utils/formErrors"

function ResetPasswordPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        passwordCode: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [message] = useState(location.state?.message || "")

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        setFieldErrors({})

        if (formData.newPassword !== formData.confirmPassword) {
            setFieldErrors({ confirmPassword: "Passwords do not match" })
            setLoading(false)
            return
        }

        try {
            const { confirmPassword, ...payload } = formData
            await resetPassword(payload)
            navigate("/login", {
                state: {
                    email: formData.email,
                    message: "Password reset successfully. You can now log in.",
                },
            })
        } catch (err) {
            if (err.fieldErrors?.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))
            } else {
                setError(err.message || "Reset failed")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg flex items-center justify-center px-6 py-20">
            <AuthForm
                title="Reset your password"
                subtitle="Enter the code from your email and a new password."
                centered
                footer={
                    <p className="text-sm text-tl-muted text-center">
                        <Link to="/login" className="font-medium text-tl-ink">Back to login</Link>
                    </p>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <p role="status" className="text-sm text-green-600">{message}</p>}

                    <AuthInput
                        name="passwordCode"
                        type="text"
                        placeholder="code"
                        value={formData.passwordCode}
                        onChange={handleChange}
                        error={fieldErrors.passwordCode}
                        autoComplete="one-time-code"
                        required
                    />
                    <AuthInput
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        error={fieldErrors.newPassword}
                        autoComplete="new-password"
                        required
                    />
                    <AuthInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={fieldErrors.confirmPassword}
                        autoComplete="new-password"
                        required
                    />
                    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-tl-accent py-3 font-medium text-white hover:bg-tl-accent-hover disabled:opacity-70 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        {loading ? "Resetting..." : "Reset password"}
                    </button>
                </form>
            </AuthForm>
        </div>
    )
}

export default ResetPasswordPage