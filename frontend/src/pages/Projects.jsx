import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    if (!name) return alert("Project name required");
    await API.post("/projects", { name, description });
    setName("");
    setDescription("");
    fetchProjects();
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-900 min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h1 className="text-3xl font-bold text-gray-100">
              My Projects
            </h1>
            <span className="text-gray-400 text-sm">
              {projects.length} projects
            </span>
          </div>

          {/* CREATE PROJECT */}
          {user.role === "admin" && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
              <h2 className="text-lg font-semibold text-amber-400 mb-4">
                Create New Project
              </h2>

              <form
                onSubmit={createProject}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
                  placeholder="Project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="bg-gray-800 border text-white border-gray-700 rounded-lg px-4 py-2"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="md:col-span-2">
                  <button className="bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold">
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PROJECT CARDS */}
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
              No projects created yet
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-amber-500 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description || "No description"}
                  </p>

                  <Link
                    to={`/projects/${project._id}/tasks`}
                    className="inline-block text-amber-400 font-medium"
                  >
                    Open Project →
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Projects;
