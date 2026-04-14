import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resendVerificationCode, verifyUser } from "../services/authService";

function VerifyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState(location.state?.message || "");
    
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("")

        try {
            await verifyUser({
                email,
                verificationCode: code,
            });

            navigate("/login", {
                state: {
                    email,
                    message: "Email verified successfully. Now you can log in"
                },
            })

        } catch (err) {
            console.error(err)
            setError(err.message || "verification failed ");
        } finally {
            setLoading(false);
        }
    }

        async function handleResend() {
            setError("")
            setMessage("")

            try {
                await resendVerificationCode(email);
                setMessage("Verification code resent. Please check your email.")
            } catch (err) {
                console.error(err)
                setError(err.message || "resend verification failed")
            }
        }

        return (
            <div className = "flex min-h-[80vh] items-center justify-center px-6">
                <div className = "w-full max-w-sm">
                    <h1 className="mb-3 text-2xl font-semibold text-gray-900">
                        Verify your email
                    </h1>

                    <p className="mb-6 text-sm text-gray-600">
                        Enter the verification code sent to <strong>{email}</strong>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {message && (<p>{message}</p>)}

                        <input
                        type = "text"
                        placeholder = "Enter your verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        required

                        />

                        {error && (<p>{error}</p>)}

                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>

                    </form>

                    <button
                    onClick={handleResend}
                    className="mt-4 text-sm font-medium text-gray-700 hover:text-black"
                    >
                        Resend code
                    </button>
                </div>
            </div>
        )
    
}
export default VerifyPage;