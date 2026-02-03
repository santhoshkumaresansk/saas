import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-amber-400">
          SaaS Manager
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <Link to="/dashboard" className="hover:text-amber-400">
            Dashboard
          </Link>
          <Link to="/projects" className="hover:text-amber-400">
            Projects
          </Link>

          <span className="text-sm text-gray-400">
            {user?.name} ({user?.role})
          </span>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 space-y-3 text-gray-300">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block hover:text-amber-400"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className="block hover:text-amber-400"
          >
            Projects
          </Link>

          <div className="text-sm text-gray-400">
            {user?.name} ({user?.role})
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 py-2 rounded text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
