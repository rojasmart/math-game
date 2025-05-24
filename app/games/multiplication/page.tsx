"use client";
import Link from "next/link";
import { useUser } from "../../../contexts/UserContext";

const multiplicationGames = [
  {
    id: "levelone",
    description: "Find the result of a × b = result",
    example: "7 × 4 = ?",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: "Level 1",
    requiredPoints: 0,
  },
  {
    id: "leveltwo",
    description: "Find the missing number: ? × b = result",
    example: "? × 4 = 12",
    color: "bg-green-500 hover:bg-green-600",
    icon: "Level 2",
    requiredPoints: 300,
  },
  {
    id: "levelthree",
    description: "Find the missing number: a × b × ? = result",
    example: "4 × 3 × ? = 12",
    color: "bg-yellow-500 hover:bg-yellow-600",
    icon: "Level 3",
    requiredPoints: 420,
  },
  {
    id: "levelfour",
    description: "Find the missing number: a × b × c × d × ? = result",
    example: "2 × 3 × 2 × 2 × ? = 48",
    color: "bg-purple-500 hover:bg-purple-600",
    icon: "Level 4",
    requiredPoints: 500,
  },
];

export default function MultiplicationGameMenu() {
  const { userSettings } = useUser();
  const userPoints = userSettings?.points || 0;

  if (!userSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-1xl font-bold text-center text-blue-700 mb-6">Multiplication Games</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Choose a game mode to practice different types of multiplication problems.</p>

        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center bg-gray-400 text-white px-3 py-2 text-lg rounded-lg hover:bg-gray-500 transition justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {multiplicationGames.map((game) => {
            const isLocked = userPoints < game.requiredPoints;
            const progressPercentage = Math.min(Math.round((userPoints / game.requiredPoints) * 100), 100);

            return (
              <div key={game.id} className="relative">
                {isLocked ? (
                  <div className={`${game.color.split(" ")[0]} opacity-50 text-white p-4 rounded-xl shadow-lg`}>
                    <div className="flex items-start">
                      <div className="relative text-xl mr-6 bg-white/20 p-4 rounded-full">
                        🔒
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                          {progressPercentage}%
                        </div>
                      </div>
                      <div>
                        <p className="text-white/90 mb-4 text-sm">Locked</p>
                        <div className="bg-white/10 px-4 py-3 rounded-lg inline-block text-base text-sm">Required: {game.requiredPoints} points</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={`/games/multiplication/${game.id}`} className="block no-underline">
                    <div className={`${game.color} text-white p-4 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl`}>
                      <div className="flex items-start">
                        <div className="text-sm mr-6 bg-white/20 p-3 rounded-full">{game.icon}</div>
                        <div>
                          <p className="text-white/90 mb-4 text-sm">{game.description}</p>
                          <div className="bg-white/10 px-4 py-3 rounded-lg inline-block text-base text-sm">Example: {game.example}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-gray-600">
          Your current points: <span className="font-bold text-blue-600">{userPoints}</span>
        </div>
      </div>
    </div>
  );
}
