import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const API_URL = "https://rs-innovators.onrender.com/api/user/profile";

  // Function to get token
  const getToken = () => sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserData();
  }, []);

  if (!user) return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto m-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-lg"
        />
      </div>

      {/* User Details */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-500">{user.email}</p>
        <p className="mt-2 text-lg font-bold text-blue-500">Total Asanas: {user.totalAsanas}</p>
        <p className="mt-2 text-gray-600">{user.bio}</p>
      </div>
    </div>
  );
}
