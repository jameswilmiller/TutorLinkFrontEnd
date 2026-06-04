import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"
import { toFieldErrorMap } from "../utils/formErrors"

function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const redirect = location.state?.redirect || "/"
    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

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

        try {
            await login(formData)
            navigate(redirect, { replace: true })
        } catch (err) {
            if (err.fieldErrors?.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))
            } else if (err.code === "ACCOUNT_NOT_VERIFIED") {
                navigate("/verify", {
                    state: {email: formData.email, redirect}
                })
            }  else {
                setError(err.message || "Login failed")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg flex items-center justify-center px-6 py-20">
            <AuthForm
                title="Welcome back."
                subtitle="Sign in to manage your sessions"
                centered
                footer={
                    <p className="text-sm text-tl-muted text-center">
                        New to TutorLink?{" "}
                       <Link
                            to="/signup"
                            state={{ redirect }}
                            className="font-medium text-tl-ink"
                        >
                            Create an account
                        </Link>
                    </p>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm text-tl-muted mb-1 block">Email</label>
                        <AuthInput
                            name="email"
                            type="email"
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={fieldErrors.email}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-tl-muted mb-1 block">Password</label>
                        <AuthInput
                            name="password"
                            type="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={fieldErrors.password}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-tl-muted hover:text-tl-ink transition">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-tl-accent py-3 font-medium text-white hover:bg-tl-accent-hover disabled:opacity-70 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </AuthForm>
        </div>
    )
}

export default LoginPage