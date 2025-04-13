"use client";
import React, { useState, useEffect } from "react";

export default function AdditionGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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

  // Check answer
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    const userNum = parseInt(userAnswer);

    setTotalQuestions((prev) => prev + 1);

    if (userNum === correctAnswer) {
      setFeedback("Correct! 🎉");
      setScore((prev) => prev + 1);
      // Set a timer to move to the next question
      setTimeout(generateNumbers, 1500);
    } else {
      setFeedback(`Wrong answer. The correct sum is ${correctAnswer}`);
      setTimeout(generateNumbers, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">Addition Game</h1>
        <p className="text-lg mb-8 text-center">Solve the addition problem below:</p>

        <div className="flex justify-center items-center mb-8 text-4xl font-bold">
          <span>{num1}</span>
          <span className="mx-3">+</span>
          <span>{num2}</span>
          <span className="mx-3">=</span>
          <span className="text-blue-500">?</span>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 p-3 border-2 border-blue-300 rounded-lg text-xl text-center focus:outline-none focus:border-blue-500"
              placeholder="Your answer"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Check
            </button>
          </div>
        </form>

        {feedback && (
          <div
            className={`p-3 text-center text-lg rounded-lg mb-4 ${
              feedback.includes("Correct") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="text-center text-gray-700">
          Score: <span className="font-bold">{score}</span> / {totalQuestions}
        </div>
      </div>

      <button onClick={generateNumbers} className="mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
        Skip (New Problem)
      </button>
    </div>
  );
}
