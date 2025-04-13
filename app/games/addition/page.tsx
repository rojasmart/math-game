"use client";
import React, { useState, useEffect } from "react";

export default function AdditionGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // Start with 60 seconds
  const [isActive, setIsActive] = useState(true);

  // Generate new random numbers
  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setUserAnswer("");
    setFeedback("");
  };

  // Initialize game
  useEffect(() => {
    generateNumbers();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      setFeedback("Time's up! Game over.");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  // Check answer
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    const userNum = parseInt(userAnswer);

    setTotalQuestions((prev) => prev + 1);

    if (userNum === correctAnswer) {
      setFeedback("Correct! 🎉 +5 seconds");
      setScore((prev) => prev + 1);
      // Add 5 seconds for correct answer
      setTimeRemaining((time) => time + 5);
      // Set a timer to move to the next question
      setTimeout(generateNumbers, 1500);
    } else {
      setFeedback(`Wrong answer. The correct sum is ${correctAnswer}. -3 seconds`);
      // Subtract 3 seconds for wrong answer, but don't go below 0
      setTimeRemaining((time) => Math.max(0, time - 3));
      setTimeout(generateNumbers, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive) {
      checkAnswer();
    }
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setTimeRemaining(60);
    setIsActive(true);
    generateNumbers();
    setFeedback("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main game area */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-green-600 text-center md:text-left">Addition Game</h1>
            <p className="text-lg mb-8 text-center md:text-left text-gray-400">Solve the addition problem below:</p>

            {/* Timer display */}
            <div className="w-full bg-gray-100 p-3 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-600">Time:</span>
                <div className="flex items-center">
                  <div className={`text-xl font-bold ${timeRemaining <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>{timeRemaining}</div>
                  <span className="ml-1 text-gray-600">seconds</span>
                </div>
              </div>

              {/* Timer progress bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeRemaining <= 10 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{
                    width: `${(timeRemaining / 60) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-start items-center mb-8 text-5xl font-bold">
              <span className="text-blue-600">{num1}</span>
              <span className="text-gray-700 mx-3">+</span>
              <span className="text-blue-600">{num2}</span>
              <span className="text-gray-700 mx-3">=</span>
              <span className="text-blue-500">?</span>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-xl text-center focus:outline-none focus:border-gray-500 text-black"
                  placeholder="Your answer"
                  required
                  disabled={!isActive}
                />
                <button
                  type="submit"
                  className={`${
                    isActive ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                  } text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer`}
                  disabled={!isActive}
                >
                  Check
                </button>
              </div>
            </form>

            {feedback && (
              <div
                className={`p-3 text-center text-lg rounded-lg mb-4 ${
                  feedback.includes("Correct")
                    ? "bg-green-100 text-green-800"
                    : feedback.includes("Time's up")
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {feedback}
              </div>
            )}
          </div>

          {/* Score card on the right */}
          <div className="md:w-64 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Your Progress</h2>

            <div className="flex flex-col space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Total Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {score} / {totalQuestions}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Correct Answers</p>
                <p className="text-2xl font-bold text-green-600">{score}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: totalQuestions > 0 ? `${(score / totalQuestions) * 100}%` : "0%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Incorrect Tries</p>
                <p className="text-2xl font-bold text-red-500">{totalQuestions - score}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isActive ? (
        <button onClick={generateNumbers} className="mt-6 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
          Skip (New Problem)
        </button>
      ) : (
        <button onClick={restartGame} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Play Again
        </button>
      )}
    </div>
  );
}
