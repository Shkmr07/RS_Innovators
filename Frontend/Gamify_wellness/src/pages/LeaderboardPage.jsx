import React, { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://rs-innovators.onrender.com/api/user/leaderboard"; // Replace with your actual API endpoint

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading leaderboard...</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Leaderboard</h1>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Completed Asanas</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index === 0
                      ? "bg-yellow-400 text-black font-bold"
                      : index === 1
                      ? "bg-gray-300"
                      : index === 2
                      ? "bg-yellow-200"
                      : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{player.name}</td>
                  <td className="py-3 px-4">{player.totalAsanas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
