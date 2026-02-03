import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">

        {/* BRAND */}
        <h1 className="text-3xl font-bold text-center text-amber-400 mb-2">
          SaaS Manager
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Create your account
        </p>

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="w-full text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
          />

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

          <button className="w-full  bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400 transition">
            Register
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
