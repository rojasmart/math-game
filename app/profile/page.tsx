"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";

export default function ProfilePage() {
  const { userSettings, updateName, updateDifficulty, updateColorScheme, toggleSound } = useUser();
  const [newName, setNewName] = useState(userSettings.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateName(newName);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">User Profile</h1>
            <Link href="/" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Back to Home
            </Link>
          </div>

          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
              <span className="text-4xl font-bold text-blue-700">{userSettings.name.substring(0, 2).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userSettings.name}</h2>
            <p className="text-blue-600 font-semibold mt-1">{userSettings.points} total points</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Display Name
            </label>
            <div className="flex">
              <input
                id="username"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your display name"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Game Settings</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
              <div className="flex gap-2">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateDifficulty(level as "easy" | "medium" | "hard")}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                      userSettings.difficulty === level ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Color Scheme</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: "default", color: "bg-blue-500" },
                  { name: "dark", color: "bg-gray-800" },
                  { name: "light", color: "bg-gray-200" },
                  { name: "contrast", color: "bg-yellow-500" },
                ].map((scheme) => (
                  <button
                    key={scheme.name}
                    onClick={() => updateColorScheme(scheme.name as any)}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors flex items-center ${
                      userSettings.colorScheme === scheme.name ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${scheme.color} mr-2`}></div>
                    {scheme.name.charAt(0).toUpperCase() + scheme.name.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={userSettings.soundEnabled} onChange={toggleSound} />
                  <div
                    className={`block w-14 h-8 rounded-full ${userSettings.soundEnabled ? "bg-green-500" : "bg-gray-400"} transition-colors`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                      userSettings.soundEnabled ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">Sound Effects {userSettings.soundEnabled ? "On" : "Off"}</div>
              </label>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Game Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-bold text-3xl">{userSettings.points}</p>
                <p className="text-blue-600">Total Points</p>
              </div>
              {/* You can add more statistics here like games played, win rate, etc. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
