import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import {useState} from "react"

function SignupPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email:"",
        password:"",
        username:"",
        firstname:"",
        lastname:""
    });
    
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
            await signupUser(formData);
            navigate("/verify", {
                state: {
                    email: formData.email,
                    message: "Account created successfully. Enter the verification code sent to your email"
                },
            });
        } catch (err) {
            console.log(err)
            setError(err.message || "signup failed"); 
        } finally {
            setLoading(false);
        }


    }
   

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <h1 className ="text-2xl font-semibold text-gray-900 mb-6">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className ="space-y-4">
                    <input
                    name = "email"
                    type = "email"
                    placeholder = "enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                    required
                    />
                    <input
                    name = "password"
                    type = "password"
                    placeholder = "please enter your password"
                    value ={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                    required 
                    />
                    <input 
                    name = "firstname"
                    type = "text"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                    required
                    />
                    <input 
                    name = "lastname"
                    type = "text"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                    required
                    />
                    <input 
                    name = "username"
                    type = "text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black outline-none"
                    required
                    />

                    {error && <p className="text-sm text-red-500"> {error}</p>}

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-black py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating account..." : "Continue"}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                <p className="mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-black">
                        Log in
                    </Link>
                </p>
            
            </div>
        </div> 
    )
}
export default SignupPage;