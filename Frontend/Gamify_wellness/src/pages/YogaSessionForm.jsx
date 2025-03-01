import React, { useState } from "react";

export default function YogaSessionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    difficulty: "Beginner",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.duration || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData); // Call the function to handle submission (pass it as a prop)
    alert("Yoga session submitted!");
    setFormData({ name: "", duration: "", difficulty: "Beginner", date: "", description: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Schedule a Yoga Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Session Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Session Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter session name"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Duration (mins) *</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter duration in minutes"
            required
          />
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Difficulty Level</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter session details..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Schedule Session
        </button>
      </form>
    </div>
  );
}
