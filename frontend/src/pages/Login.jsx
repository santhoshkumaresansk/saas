import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");

        }
        catch (error) {
            if (error.response && error.response.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Something Now went wrong. Please try again.");
            }
        }


    };

    return (
        <div className="min-h-screen bg-slate-800 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">

                {/* BRAND */}
                <h1 className="text-3xl font-bold text-center text-amber-400 mb-2">
                    SaaS Manager
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Sign in to continue
                </p>

                {/* FORM */}
                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        className="w-full text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="w-full text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="w-full bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400 transition">
                        Login
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center text-gray-400 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-amber-400 hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
