import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login & Signup

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const endpoint = isSignUp ? "/api/user/signup" : "/api/user/login"; // Adjust based on backend
    const payload = isSignUp
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      : { email: formData.email, password: formData.password };
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`${isSignUp ? "Signup" : "Login"} Successful!`);
        if(!isSignUp){
          sessionStorage.setItem("token", data.accessToken);
        }
        setIsAuthenticated(true);
        setIsModalOpen(false);
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gamify Wellness</h1>

          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/yoga-sessions"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Yoga Sessions
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "border-b-2 border-white" : ""
                    }`
                  }
                >
                  Profile
                </NavLink>
              ) : (
                <button
                  className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md hover:bg-yellow-500 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Login / Sign Up
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal for Login/Signup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              {isSignUp ? "Create an Account" : "Welcome Back!"}
            </h2>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            {/* Toggle between Login/Signup */}
            <p className="text-sm text-center mt-4 text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>

            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
