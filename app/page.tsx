"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const { userSettings, isLoggedIn, updateName, logout } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [mounted, setMounted] = useState(false);

  // Set up initial state only after component mounts on client
  useEffect(() => {
    setMounted(true);
    if (userSettings?.name) {
      setNewName(userSettings.name);
    }
  }, [userSettings?.name]);
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userSettings) {
      updateName(newName);
      setIsProfileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const games = [
    {
      id: "addition",
      title: "Addition Game",
      description: "Practice adding numbers together quickly and accurately.",
      color: "bg-blue-500 hover:bg-blue-600",
      icon: "➕",
    },
    {
      id: "subtraction",
      title: "Subtraction Game",
      description: "Master the art of subtracting numbers efficiently.",
      color: "bg-green-500 hover:bg-green-600",
      icon: "➖",
    },
    {
      id: "multiplication",
      title: "Multiplication Game",
      description: "Multiply numbers and improve your mathematical skills.",
      color: "bg-yellow-500 hover:bg-yellow-600",
      icon: "✖️",
    },
    {
      id: "division",
      title: "Division Game",
      description: "Learn to divide numbers quickly and precisely.",
      color: "bg-red-500 hover:bg-red-600",
      icon: "➗",
    },
  ];
  // Don't render user-specific content until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-blue-700">Loading...</div>
      </div>
    );
  }

  // Show login form if user is not logged in
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* User Header Bar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">Math Blast</h1>

            <div className="flex items-center space-x-4">
              {" "}
              {/* Points Display */}
              <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {userSettings?.points ?? 0} pts
              </div>
              {/* User Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {userSettings?.name?.substring(0, 1).toUpperCase() ?? "?"}
                  </div>
                  <span className="text-blue-700">{userSettings?.name ?? "Guest"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-bold text-gray-700">Your Profile</h3>
                      <form onSubmit={handleNameSubmit} className="mt-2">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                          placeholder="Change your name"
                        />
                        <button
                          type="submit"
                          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors cursor-pointer"
                        >
                          Update Name
                        </button>
                      </form>
                    </div>
                    <ul>
                      <li>
                        <Link href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings & Profile
                          </div>
                        </Link>
                      </li>
                      <li>
                        <div onClick={handleLogout} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 mb-10">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Welcome to Math Blast!</h1>
          <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose a game to start practicing your math skills. These interactive games are designed to help improve your mathematical abilities in a
            fun way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <Link key={game.id} href={`/games/${game.id}`} className="block no-underline">
                <div className={`${game.color} text-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl`}>
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 bg-white/20 p-3 rounded-full">{game.icon}</div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                      <p className="text-white/90">{game.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Why Play Math Blast?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">Skill Improvement</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Improve mental calculation speed</li>
                <li>Build mathematical confidence</li>
                <li>Enhance problem-solving abilities</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">Learning Environment</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Practice in a stress-free environment</li>
                <li>Learn at your own pace</li>
                <li>Immediate feedback on your progress</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-700 mb-2">Progress Tracking</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Track your progress over time</li>
                <li>Set personal goals and achievements</li>
                <li>Review your performance history</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-700 mb-2">Challenge Yourself</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Challenge yourself with increasing difficulty levels</li>
                <li>Compete against your previous best scores</li>
                <li>Master complex mathematical concepts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
