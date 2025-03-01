import React from "react";

export default function LeaderboardPage() {
  // Mock leaderboard data (Replace with API data if needed)
  const leaderboardData = [
    { id: 1, name: "Alice Johnson", score: 950 },
    { id: 2, name: "John Doe", score: 900 },
    { id: 3, name: "Emma Watson", score: 850 },
    { id: 4, name: "Michael Brown", score: 800 },
    { id: 5, name: "Sophia Lee", score: 750 },
  ];

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
                <th className="py-3 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr
                  key={player.id}
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
                  <td className="py-3 px-4">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
