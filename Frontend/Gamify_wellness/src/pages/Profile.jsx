import React, { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    points: 1200,
    bio: "Yoga enthusiast & wellness lover!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <div className="max-w-lg mx-auto m-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-lg"
        />
      </div>

      {/* User Details */}
      <div className="mt-4 text-center">
        {!editMode ? (
          <>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <p className="mt-2 text-lg font-bold text-blue-500">Points: {user.points}</p>
            <p className="mt-2 text-gray-600">{user.bio}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />

            {/* Bio */}
            <textarea
              name="bio"
              value={updatedUser.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write a short bio..."
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-full mt-2 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
