import {useState} from "react"
import {Link, useNavigate, useLocation} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email:location.state?.email || "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const successMessage =  ""

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(formData);
            navigate("/")
        } catch (err) {
            console.error(err)
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    
    return (
    <div className = "flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-sm">
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                Log in
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {successMessage && (<p className="text-sm text-green-600">{successMessage}</p>
                )}

                <input
                name="email"
                type="email"
                placeholder="Enter email"
                value = {formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                required    
                />

                <input
                name="password"
                type="password"
                placeholder="Enter password"
                value = {formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                required
                />

                {error && (<p className="text-sm text-red-500"> {error}</p>)}

                <button
                type = "submit"
                className="w-full rounded-lg bg-black text-white py-3 font-medium hover:opacity-90">
                    {loading ? "Logging in..." : "Continue"}
                </button>
            </form>

            <div className="my-6 flex items-center">  
                <div className="flex-1 h-px bg-gray-300 "/>

            </div>

            <p className="mt-6 text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-black">
                Sign up
                </Link>
            </p>
        </div>
    </div>
    )
}

export default LoginPage;