import React, { useEffect, useState } from "react";

export default function YogaSession() {
  const [formData, setFormData] = useState({
    yogaName: "",
    duration: "",
    asanasCompleted: "",
    difficulty: "Easy",
    description: "",
  });
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const getToken = () => sessionStorage.getItem("token");

  const API_BASE_URL = "http://localhost:3000/api/yoga"; // Change as per your backend
  const fetchUrl = `${API_BASE_URL}/yogaDetails`;
  const submitUrl = `${API_BASE_URL}/create`; // Adjust the endpoint

  // Fetch past yoga sessions
  useEffect(() => {
    async function fetchPastSessions() {
      try {
        const response = await fetch(fetchUrl, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!response.ok) throw new Error("Failed to fetch yoga sessions");

        const data = await response.json();
        setPastSessions(data);

        // If no sessions, show the form by default
        setShowForm(data.length === 0);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPastSessions();
  }, []);

  // Handle form submission
  async function submitSession(e) {
    e.preventDefault();

    if (!formData.yogaName || !formData.duration || !formData.asanasCompleted) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit yoga session");

      alert("Yoga session submitted!");

      const newSessionData = await response.json();

      setPastSessions((prev) => [newSessionData.yoga, ...prev]);

      // Reset form after submission
      setFormData({
        yogaName: "",
        duration: "",
        asanasCompleted: "",
        difficulty: "Easy",
        description: "",
      });

      // Refetch sessions after adding new one
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting session:", error);
      alert("Failed to submit session.");
    }
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {showForm ? "Schedule a Yoga Session" : "Your Yoga History"}
      </h2>

      {showForm ? (
        <form onSubmit={submitSession} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Session Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, yogaName: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter session name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Duration (mins) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter duration in minutes"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Number of Asanas *
            </label>
            <input
              type="number"
              name="noOfAsanas"
              value={formData.asanasCompleted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  asanasCompleted: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter number of asanas"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter session details..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Schedule Session
          </button>
        </form>
      ) : (
        <div>
          {pastSessions.length > 0 ? (
            <ul className="space-y-4">
              {pastSessions.map((session, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="font-semibold text-lg">{session.yogaName}</p>
                  <p>Duration: {session.duration} mins</p>
                  <p>Number of Asanas: {session.asanasCompleted}</p>
                  <p>Difficulty: {session.difficulty}</p>
                  <p>Description: {session.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No past yoga sessions found.
            </p>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-600 text-white py-3 font-semibold rounded-lg hover:bg-green-700 transition mt-4"
          >
            Add New Session
          </button>
        </div>
      )}
    </div>
  );
}
