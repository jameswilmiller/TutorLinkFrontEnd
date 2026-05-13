import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signupUser } from "../services/authService"
import AuthLayout from "../components/auth/AuthLayout"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"
import { toFieldErrorMap } from "../utils/formErrors"

const LEFT_PANEL = (
    <div className="space-y-6">
        <h2 className="font-display text-5xl text-white leading-tight">
            Find a tutor who gets it.
        </h2>
        <p className="text-white/70 text-lg leading-relaxed">
            Search by course code and connect with UQ students and alumni who have aced what you are studying.
        </p>
        <blockquote className="border-l-2 border-white/30 pl-4 mt-12">
            <p className="text-white/80 italic font-display text-lg">
                "Education is not the filling of a pail, but the lighting of a fire."
            </p>
            <p className="text-white/50 text-sm mt-2">— W.B. Yeats</p>
        </blockquote>
    </div>
)

function SignupPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: ""
    })

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
            await signupUser(formData)
            navigate("/verify", {
                state: {
                    email: formData.email,
                    message: "Account created successfully. Enter the verification code sent to your email"
                },
            })
        } catch (err) {
            if (err.fieldErrors?.length > 0) {
                setFieldErrors(toFieldErrorMap(err.fieldErrors))
            } else {
                setError(err.message || "Signup failed")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            left={LEFT_PANEL}
            right={
                <AuthForm
                    title="Create your account"
                    subtitle="Takes about 30 seconds."
                    footer={
                        <p className="text-sm text-tl-muted">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-tl-ink">
                                Log in
                            </Link>
                        </p>
                    }
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AuthInput
                            name="email"
                            type="email"
                            placeholder="your@student.uq.edu.au"
                            value={formData.email}
                            onChange={handleChange}
                            error={fieldErrors.email}
                            autoComplete="email"
                            required
                        />
                        <AuthInput
                            name="password"
                            type="password"
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            error={fieldErrors.password}
                            autoComplete="new-password"
                            required
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <AuthInput
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                                error={fieldErrors.firstname}
                                autoComplete="given-name"
                                required
                            />
                            <AuthInput
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                                error={fieldErrors.lastname}
                                autoComplete="family-name"
                                required
                            />
                        </div>
                        <AuthInput
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            error={fieldErrors.username}
                            autoComplete="username"
                            required
                        />

                        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-tl-accent py-3 font-medium text-white hover:bg-tl-accent-hover disabled:opacity-70 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Creating account..." : "Continue"}
                        </button>
                    </form>
                </AuthForm>
            }
        />
    )
}

export default SignupPage