import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import LandingPage from "./pages/LandingPage";
import LeaderboardPage from "./pages/LeaderBoardPage";
import YogaSessionForm from "./pages/YogaSessionForm";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="flex flex-col min-h-screen">  {/* Main container with flexbox */}
      <Navbar />

      <main className="flex-grow">  {/* Pushes the footer down */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/yoga-sessions" element={<YogaSessionForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
