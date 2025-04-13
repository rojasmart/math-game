import Link from "next/link";

export default function Home() {
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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 mb-10">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Welcome to Math Games!</h1>
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
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Why Play Math Games?</h2>
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
