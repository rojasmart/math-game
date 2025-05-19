"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "../../../contexts/UserContext";

export default function MultiplicationGame() {
  const { userSettings } = useUser();
  const currentPoints = userSettings?.points || 0;

  const levels = [
    {
      id: 1,
      title: "Level 1",
      description: "Basic Multiplication",
      path: "/games/multiplication/levelone",
      requiredPoints: 0,
    },
    {
      id: 2,
      title: "Level 2",
      description: "Find Missing First Number",
      path: "/games/multiplication/leveltwo",
      requiredPoints: 300,
    },
    {
      id: 3,
      title: "Level 3",
      description: "Find Missing Second Number",
      path: "/games/multiplication/levelthree",
      requiredPoints: 420,
    },
    {
      id: 4,
      title: "Level 4",
      description: "Chain Multiplication",
      path: "/games/multiplication/levelfour",
      requiredPoints: 500,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Multiplication Game</h1>
          <Link href="/" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => {
            const isLocked = currentPoints < level.requiredPoints;

            return (
              <div key={level.id} className={`bg-white rounded-xl shadow-md overflow-hidden ${isLocked ? "opacity-75" : ""}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-blue-700">{level.title}</h2>
                    {isLocked && (
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">{level.requiredPoints} pts</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{level.description}</p>
                  {isLocked ? (
                    <div className="flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Unlock at {level.requiredPoints} points
                    </div>
                  ) : (
                    <Link href={level.path} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Play Now
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
