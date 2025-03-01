import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gamify Wellness</h1>

        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/yoga-sessions"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Yoga Sessions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
