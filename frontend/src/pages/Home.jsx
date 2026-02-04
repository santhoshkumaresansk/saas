import { Link } from "react-router-dom";
import API from "../services/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [apiStatus, setApiStatus] = useState("connecting");

  useEffect(() => {
    const checkAPI = async () => {
      try {
        await API.get("/");
        setApiStatus("running");
      } catch (err) {
        setApiStatus("error");
      }
    };

    checkAPI();
  }, []);

  const renderStatus = () => {
    if (apiStatus === "connecting") {
      return (
        <span className="text-yellow-400">
          Connecting to API… please wait ⏳
        </span>
      );
    }
    if (apiStatus === "running") {
      return (
        <span className="text-green-400">
          API is running 🚀
        </span>
      );
    }
    return (
      <span className="text-red-400">
        Backend not reachable ❌
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-2">
        SaaS Project Manager
      </h1>

      <p className="text-slate-300 mb-4">
        Manage projects and tasks like a real product team.
      </p>

      <p className="mb-6">
        API Status: {renderStatus()}
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="border border-yellow-500 text-yellow-400 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
