import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthForm from "../components/auth/AuthForm"
import AuthInput from "../components/auth/AuthInput"

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
   
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await login(formData);
            navigate("/")
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-tl-bg flex items-start justify-center px-6 pt-[25vh]">
            <AuthForm
                title="Welcome back."
                subtitle="Sign in to manage your sessions"
                centered
                footer={
                    <p className="text-sm text-tl-muted text-center">
                        New to TutorLink?{" "}
                        <Link to="/signup" className="font-medium text-tl-ink">
                            Create an account
                        </Link>
                    </p>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-tl-muted mb-1 block">Email</label>
                        <AuthInput
                            name="email"
                            type="email"
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm text-tl-muted mb-1 block">Password</label>
                        <AuthInput
                            name="password"
                            type="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

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

export default LoginPage;