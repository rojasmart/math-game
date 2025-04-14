"use client";
import React, { useState, useEffect } from "react";
import GameHeader from "../../../components/GameHeader";
import { useUser } from "../../../contexts/UserContext";

export default function AdditionGame() {
  const { userSettings, addPoints } = useUser();
  const [mounted, setMounted] = useState(false);

  // Definir uma constante para o tempo inicial com base na dificuldade
  const getDefaultTime = () => {
    if (userSettings.difficulty === "easy") return 13;
    if (userSettings.difficulty === "medium") return 9;
    return 5; // hard
  };

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(getDefaultTime());
  const [isActive, setIsActive] = useState(true);

  const [timeChange, setTimeChange] = useState({ value: 0, isShowing: false });

  // Add new state for stats visibility
  const [showStats, setShowStats] = useState(false);

  // Generate new random numbers
  const generateNumbers = () => {
    let range = 20;
    if (userSettings.difficulty === "easy") range = 10;
    if (userSettings.difficulty === "hard") range = 50;

    setNum1(Math.floor(Math.random() * range) + 1);
    setNum2(Math.floor(Math.random() * range) + 1);
    setUserAnswer("");
    setFeedback("");
  };

  // Initialize game only after component is mounted on client
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      setTimeRemaining(getDefaultTime());
      setIsActive(true);
      generateNumbers();
    }
  }, [mounted, userSettings]);

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

  // Add this near your other useEffect hooks
  useEffect(() => {
    if (isActive) {
      // Focus the input when the component mounts or when the game is active
      const inputElement = document.querySelector('input[type="number"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }

      // Add keyboard listener for direct number input
      const handleKeyDown = (e) => {
        // Only handle keys if the input element is not focused
        const inputElement = document.querySelector('input[type="number"]') as HTMLInputElement;
        if (inputElement === document.activeElement) {
          // Input is focused, let the native handler work
          return;
        }

        const key = e.key;
        // Allow numbers 0-9
        if (/^[0-9]$/.test(key) && isActive) {
          setUserAnswer((prev) => `${prev}${key}`);
          // Optionally focus the input after typing
          if (inputElement) inputElement.focus();
        }
        // Allow backspace
        else if (key === "Backspace" && isActive) {
          setUserAnswer((prev) => prev.slice(0, -1));
        }
        // Allow Enter for submission
        else if (key === "Enter" && isActive && userAnswer) {
          e.preventDefault();
          checkAnswer();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isActive, userAnswer]);

  // Check answer
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    const userNum = parseInt(userAnswer);

    setTotalQuestions((prev) => prev + 1);

    if (userNum === correctAnswer) {
      setFeedback("");
      setScore((prev) => prev + 1);

      // Award points based on difficulty
      const pointsToAdd = userSettings.difficulty === "easy" ? 1 : userSettings.difficulty === "medium" ? 2 : 3;

      addPoints(pointsToAdd);

      // Add time bonuses based on difficulty
      const timeBonus = userSettings.difficulty === "easy" ? 3 : userSettings.difficulty === "medium" ? 2 : 1;

      setTimeRemaining((time) => time + timeBonus);
      setTimeChange({ value: timeBonus, isShowing: true });

      setTimeout(generateNumbers, 500);
      setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
    } else {
      // Wrong answer logic
      const timePenalty = userSettings.difficulty === "easy" ? -3 : userSettings.difficulty === "medium" ? -2 : -1;

      setTimeRemaining((time) => Math.max(0, time + timePenalty)); // Prevent negative time
      setTimeChange({ value: timePenalty, isShowing: true });

      setTimeout(() => {
        setFeedback("");
        generateNumbers();
      }, 1500);

      setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
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
    setTimeRemaining(getDefaultTime());
    setIsActive(true);
    generateNumbers();
    setFeedback("");
  };

  // Only render the full content after the component is mounted
  if (!mounted) {
    return <div className="bg-blue-50 min-h-screen p-8">Loading...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <GameHeader title="Addition Game" />
      <div className="flex flex-col items-center justify-center h-[calc(90vh-120px)] p-8 bg-blue-50">
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main game area */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold text-green-600">Addition Game</h1>{" "}
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className={`text-sm px-4 py-2 rounded-lg flex items-center cursor-pointer transition-all shadow-sm hover:shadow
    ${showStats ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}
                  >
                    {showStats ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 stroke-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hide Stats
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 stroke-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Show Stats
                      </>
                    )}
                  </button>
                </div>

                <p className="text-lg mb-8 text-center md:text-left text-gray-400">Solve the addition problem below:</p>

                {/* Timer display */}
                <div className="w-full bg-gray-100 p-3 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-600">Time:</span>
                    <div className="flex items-center">
                      <div className={`text-xl font-bold ${timeRemaining <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>
                        {timeRemaining}
                      </div>
                      <span className="ml-1 text-gray-600">seconds</span>

                      {/* Time change indicator */}
                      {timeChange.isShowing && (
                        <div className={`ml-2 font-bold text-lg animate-fade-in-out ${timeChange.value > 0 ? "text-green-600" : "text-red-600"}`}>
                          {timeChange.value > 0 ? `+${timeChange.value}` : timeChange.value}
                        </div>
                      )}
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
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 mb-2">
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="flex-1 p-3 border-b-2 border-gray-300 rounded-none text-xl text-center focus:outline-none focus:border-blue-500 text-black bg-transparent"
                        placeholder="Your answer"
                        required
                        disabled={!isActive}
                        autoFocus
                        onBlur={(e) => e.target.focus()} // Keep focus on input
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

                    {/* Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => isActive && setUserAnswer((prevAnswer) => `${prevAnswer}${num}`)}
                          className={`${
                            isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
                          } text-gray-800 p-4 rounded-lg font-bold text-xl transition shadow-sm`}
                          disabled={!isActive}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => isActive && setUserAnswer((prevAnswer) => prevAnswer.slice(0, -1))}
                        className={`${
                          isActive ? "bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300" : "bg-gray-100"
                        } text-gray-800 p-4 rounded-lg font-bold text-xl transition col-span-1 shadow-sm`}
                        disabled={!isActive}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => isActive && setUserAnswer((prevAnswer) => `${prevAnswer}0`)}
                        className={`${
                          isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
                        } text-gray-800 p-4 rounded-lg font-bold text-xl transition shadow-sm`}
                        disabled={!isActive}
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={() => isActive && setUserAnswer("")}
                        className={`${
                          isActive ? "bg-red-100 hover:bg-red-200 active:bg-red-300" : "bg-gray-100"
                        } text-gray-800 p-4 rounded-lg font-bold text-xl transition shadow-sm`}
                        disabled={!isActive}
                      >
                        C
                      </button>
                    </div>
                  </div>
                </form>

                {feedback && <div className="p-3 text-center text-lg rounded-lg mb-4 bg-red-100 text-red-800">{feedback}</div>}
              </div>
            </div>
          </div>
          {/* Score card on the right */}
          {showStats && (
            <div className="md:w-64 p-6 bg-white rounded-xl border border-gray-200 bg-white p-8 rounded-xl shadow-md">
              <div className="flex flex-col space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {score} / {totalQuestions}
                  </p>
                </div>

                <div className="bg-gray-100  p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">{score}</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: totalQuestions > 0 ? `${(score / totalQuestions) * 100}%` : "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">Incorrect Tries</p>
                  <p className="text-2xl font-bold text-red-500">{totalQuestions - score}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!isActive && (
          <button onClick={restartGame} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
