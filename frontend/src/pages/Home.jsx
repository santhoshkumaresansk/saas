import { Link } from "react-router-dom";
import API from "../services/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const res = await API.get("/");
        setApiStatus(res.data);
      } catch {
        setApiStatus("Backend not reachable");
      }
    };
    checkAPI();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">
          SaaS Project Manager
        </h1>
        <p className="text-gray-400 mb-6">
          Manage projects and tasks like a real product team.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          API Status: <span className="text-amber-400">{apiStatus}</span>
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-amber-500 text-amber-400 px-6 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
