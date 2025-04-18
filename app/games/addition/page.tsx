"use client";
import Link from "next/link";
import { useUser } from "../../../contexts/UserContext";

const additionGames = [
  {
    id: "levelone",
    description: "Find the result of a + b = ?",
    example: "7 + 4 = ?",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: "Level 1",
    requiredPoints: 0,
  },
  {
    id: "leveltwo",
    description: "Find the missing number: a + ? = c",
    example: "5 + ? = 12",
    color: "bg-green-500 hover:bg-green-600",
    icon: "Level 2",
    requiredPoints: 300,
  },
  {
    id: "levelthree",
    description: "Find the missing number: a + b + c + ? = result",
    example: "3 + 2 + 4 + ? = 15",
    color: "bg-yellow-500 hover:bg-yellow-600",
    icon: "Level 3",
    requiredPoints: 420,
  },
  {
    id: "levelfour",
    description: "Find the missing number: a + b + ? = d",
    example: "6 + 3 + ? = 15",
    color: "bg-purple-500 hover:bg-purple-600",
    icon: "Level 4",
    requiredPoints: 500,
  },
];

export default function AdditionGameMenu() {
  const { userSettings } = useUser();
  const userPoints = userSettings?.points || 0;

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-1xl font-bold text-center text-blue-700 mb-6">Addition Games</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Choose a game mode to practice different types of addition problems.</p>

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
          {additionGames.map((game) => {
            const isLocked = userPoints < game.requiredPoints;

            return (
              <div key={game.id} className="relative">
                {isLocked ? (
                  <div className={`${game.color.split(" ")[0]} opacity-50 text-white p-6 rounded-xl shadow-lg`}>
                    <div className="flex items-start">
                      <div className="text-4xl mr-4 bg-white/20 p-3 rounded-full">🔒</div>
                      <div>
                        <p className="text-white/90 mb-2">Locked</p>
                        <div className="bg-white/10 px-3 py-2 rounded-lg inline-block">Required: {game.requiredPoints} points</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={`/games/addition/${game.id}`} className="block no-underline">
                    <div className={`${game.color} text-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl`}>
                      <div className="flex items-start">
                        <div className="text-1xl mr-4 bg-white/20 p-3 rounded-full">{game.icon}</div>
                        <div>
                          <p className="text-white/90 mb-2">{game.description}</p>
                          <div className="bg-white/10 px-3 py-2 rounded-lg inline-block">Example: {game.example}</div>
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
