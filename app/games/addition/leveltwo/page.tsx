"use client";
import React, { useState, useEffect } from "react";
import GameHeader from "../../../../components/GameHeader";
import { useUser } from "../../../../contexts/UserContext";

export default function AdditionGameTwo() {
  const { userSettings, addPoints } = useUser();
  const [mounted, setMounted] = useState(false);

  const getDefaultTime = () => {
    if (userSettings.difficulty === "easy") return 13;
    if (userSettings.difficulty === "medium") return 9;
    return 5; // hard
  };

  const [num1, setNum1] = useState(0);
  const [result, setResult] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(getDefaultTime());
  const [isActive, setIsActive] = useState(true);
  const [timeChange, setTimeChange] = useState({ value: 0, isShowing: false });
  const [showNumPad, setShowNumPad] = useState(true);

  // Generate new problem
  const generateProblem = () => {
    let range = 20;
    if (userSettings.difficulty === "easy") range = 10;
    if (userSettings.difficulty === "hard") range = 50;

    // First, generate the result
    const finalResult = Math.floor(Math.random() * range) + 1;
    // Then generate the first number (must be smaller than result)
    const firstNum = Math.floor(Math.random() * finalResult);

    setNum1(firstNum);
    setResult(finalResult);
    setUserAnswer("");
    setFeedback("");
  };

  // Initialize game
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      setTimeRemaining(getDefaultTime());
      setIsActive(true);
      generateProblem();
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

  // Keyboard input handler
  useEffect(() => {
    if (isActive) {
      const handleKeyDown = (e) => {
        const inputElement = document.querySelector('input[type="number"]') as HTMLInputElement;
        if (inputElement === document.activeElement) return;

        const key = e.key;
        if (/^[0-9]$/.test(key) && isActive) {
          setUserAnswer((prev) => `${prev}${key}`);
          if (inputElement) inputElement.focus();
        } else if (key === "Backspace" && isActive) {
          setUserAnswer((prev) => prev.slice(0, -1));
        } else if (key === "Enter" && isActive && userAnswer) {
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
    const correctAnswer = result - num1;
    const userNum = parseInt(userAnswer);

    setTotalQuestions((prev) => prev + 1);

    if (userNum === correctAnswer) {
      setFeedback("");
      setScore((prev) => prev + 1);

      const pointsToAdd = userSettings.difficulty === "easy" ? 1 : userSettings.difficulty === "medium" ? 2 : 3;
      addPoints(pointsToAdd);

      const timeBonus = userSettings.difficulty === "easy" ? 3 : userSettings.difficulty === "medium" ? 2 : 1;
      setTimeRemaining((time) => time + timeBonus);
      setTimeChange({ value: timeBonus, isShowing: true });

      setTimeout(generateProblem, 500);
      setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
    } else {
      const timePenalty = userSettings.difficulty === "easy" ? -3 : userSettings.difficulty === "medium" ? -2 : -1;
      setTimeRemaining((time) => Math.max(0, time + timePenalty));
      setTimeChange({ value: timePenalty, isShowing: true });

      setFeedback(`Incorrect! ${num1} + ${correctAnswer} = ${result}`);

      setTimeout(() => {
        setFeedback("");
        generateProblem();
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

  const restartGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setTimeRemaining(getDefaultTime());
    setIsActive(true);
    generateProblem();
    setFeedback("");
  };

  if (!mounted) {
    return <div className="bg-blue-50 min-h-screen p-8">Loading...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <GameHeader title="Level 2" showPlayAgain={!isActive} onPlayAgain={restartGame} />
      <div className="flex flex-col items-center justify-center h-[calc(90vh-120px)] p-8 bg-blue-50">
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setShowNumPad(!showNumPad)}
                    className={`text-sm px-4 py-2 rounded-lg flex items-center cursor-pointer transition-all shadow-sm
                    ${showNumPad ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}
                  >
                    {showNumPad ? "Hide Numpad" : "Show Numpad"}
                  </button>
                </div>

                {/* Timer display - same as original game */}
                <div className="w-full bg-gray-100 p-3 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-600">Time:</span>
                    <div className="flex items-center">
                      <div className={`text-xl font-bold ${timeRemaining <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>
                        {timeRemaining}
                      </div>
                      <span className="ml-1 text-gray-600">seconds</span>
                      {timeChange.isShowing && (
                        <div className={`ml-2 font-bold text-lg animate-fade-in-out ${timeChange.value > 0 ? "text-green-600" : "text-red-600"}`}>
                          {timeChange.value > 0 ? `+${timeChange.value}` : timeChange.value}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeRemaining <= 10 ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${(timeRemaining / getDefaultTime()) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Equation display */}
                <div className="flex justify-center md:justify-start items-center mb-8 text-5xl font-bold">
                  <span className="text-blue-600">{num1}</span>
                  <span className="text-gray-700 mx-3">+</span>
                  <span className="text-blue-600 bg-gray-100 px-4 py-2 rounded-lg">?</span>
                  <span className="text-gray-700 mx-3">=</span>
                  <span className="text-blue-500">{result}</span>
                </div>

                {/* Rest of the component remains the same as the original game */}
                {/* ... */}
              </div>
            </div>
          </div>

          {/* Numpad - same as original game */}
          {showNumPad && (
            <div className="md:w-80 h-80 p-6 bg-white rounded-xl border border-gray-200 shadow-md flex items-center justify-center">
              <div className="w-full h-full">
                <div className="grid grid-cols-3 gap-2 h-full">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => isActive && setUserAnswer((prevAnswer) => `${prevAnswer}${num}`)}
                      className={`${
                        isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
                      } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
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
                    } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
                    disabled={!isActive}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => isActive && setUserAnswer((prevAnswer) => `${prevAnswer}0`)}
                    className={`${
                      isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
                    } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
                    disabled={!isActive}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => isActive && setUserAnswer("")}
                    className={`${
                      isActive ? "bg-red-100 hover:bg-red-200 active:bg-red-300" : "bg-gray-100"
                    } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
                    disabled={!isActive}
                  >
                    C
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
