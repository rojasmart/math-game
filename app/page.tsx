import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Math Games!</h1>
      <p className="text-lg mb-8">Choose a game to start practicing your math skills.</p>
      <div className="flex flex-col space-y-4">
        <a href="/games/addition" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Addition Game
        </a>
        <a href="/games/subtraction" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Subtraction Game
        </a>
        <a href="/games/multiplication" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Multiplication Game
        </a>
        <a href="/games/division" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Division Game
        </a>
      </div>
    </div>
  );
}
