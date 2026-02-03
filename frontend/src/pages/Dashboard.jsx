import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));

    if (user.role === "member") {
      API.get("/tasks/my").then(res => setTasks(res.data));
    }

    if (user.role === "admin") {
      API.get("/users").then(res => setUsers(res.data));
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 px-4 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-gray-100 mb-1">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-400 mb-10">
            Role: <span className="text-amber-400">{user.role}</span>
          </p>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">

            {/* PROJECTS */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Total Projects</p>
              <h2 className="text-3xl font-bold text-amber-400">
                {projects.length}
              </h2>
            </div>

            {/* MEMBER ONLY: MY TASKS */}
            {user.role === "member" && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-400 text-sm">My Tasks</p>
                <h2 className="text-3xl font-bold text-amber-400">
                  {tasks.length}
                </h2>
              </div>
            )}

            {/* ADMIN ONLY: USERS */}
            {user.role === "admin" && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Total Users</p>
                <h2 className="text-3xl font-bold text-amber-400">
                  {users.length}
                </h2>
              </div>
            )}

            {/* STATUS */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">System Status</p>
              <h2 className="text-lg font-semibold text-green-500">
                Active
              </h2>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PROJECTS */}
            <Link
              to="/projects"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500 transition"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                📁 Projects
              </h3>
              <p className="text-gray-400">
                Create and manage projects
              </p>
            </Link>

            {/* TASKS (MEMBER) */}
            {user.role === "member" && (
              <Link
                to="/projects"
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500 transition"
              >
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  ✅ My Tasks
                </h3>
                <p className="text-gray-400">
                  View and complete assigned tasks
                </p>
              </Link>
            )}

            {/* USERS (ADMIN) */}
            {user.role === "admin" && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  👥 Users
                </h3>
                <p className="text-gray-400">
                  Assign projects & tasks to members
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
