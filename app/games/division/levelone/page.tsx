"use client";
import { useState, useEffect } from "react";
import { useUser } from "../../../../contexts/UserContext";
import GameHeader from "../../../../components/GameHeader";

export default function DivisionGameLevelOne() {
  const { userSettings, addPoints } = useUser();
  const [mounted, setMounted] = useState(false);

  const getDefaultTime = () => {
    if (userSettings?.difficulty === "easy") return 15;
    if (userSettings?.difficulty === "medium") return 12;
    return 8; // hard
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
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [showNumPad, setShowNumPad] = useState(true);

  // Generate new random numbers
  const generateNumbers = () => {
    // For division, we'll generate pairs that result in whole numbers
    let maxDivisor = 10;
    let maxDividend = 50;

    if (userSettings?.difficulty === "easy") {
      maxDivisor = 5;
      maxDividend = 25;
    } else if (userSettings?.difficulty === "hard") {
      maxDivisor = 12;
      maxDividend = 120;
    }

    // Generate divisor first
    const divisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Avoid division by 1

    // Generate a multiple of the divisor to ensure clean division
    const multiplier = Math.floor(Math.random() * (maxDividend / divisor)) + 1;
    const dividend = divisor * multiplier;

    setNum1(dividend);
    setNum2(divisor);
    setUserAnswer("");

    setQuestionStartTime(Date.now()); // Reset the start time for new question
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
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      clearInterval(interval);
      handleGameOver();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  // Keyboard input handler
  useEffect(() => {
    if (isActive) {
      const handleKeyDown = (e: KeyboardEvent) => {
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
    const correctAnswer = num1 / num2;
    const userNum = parseInt(userAnswer);
    const responseTime = (Date.now() - questionStartTime) / 1000; // Convert to seconds

    setTotalQuestions((prev) => prev + 1);

    if (userNum === correctAnswer) {
      // Calculate time-based bonus points
      let timeBonus = 0;
      if (responseTime <= 1) {
        timeBonus = userSettings?.difficulty === "easy" ? 3 : 4;
      } else if (responseTime <= 2) {
        timeBonus = userSettings?.difficulty === "easy" ? 2 : 3;
      } else if (responseTime <= 3) {
        timeBonus = 2;
      } else {
        timeBonus = 1;
      }

      setScore((prev) => prev + timeBonus);

      // Time bonus for timer remains the same
      const timerBonus = userSettings?.difficulty === "easy" ? 3 : userSettings?.difficulty === "medium" ? 2 : 1;
      setTimeRemaining((time) => time + timerBonus);
      setTimeChange({ value: timerBonus, isShowing: true });

      // Show feedback with points earned
      setTimeout(() => setFeedback(""), 1500);

      setTimeout(generateNumbers, 500);
      setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
    } else {
      // Existing wrong answer logic
      const timePenalty = userSettings?.difficulty === "easy" ? -3 : userSettings?.difficulty === "medium" ? -2 : -1;
      setTimeRemaining((time) => Math.max(0, time + timePenalty));
      setTimeChange({ value: timePenalty, isShowing: true });

      setTimeout(() => {
        generateNumbers();
      }, 1500);

      setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
  };

  const handleGameOver = () => {
    // Make sure we set isActive to false
    setIsActive(false);

    // Calculate points based on score and difficulty
    const difficultyMultiplier = userSettings?.difficulty === "easy" ? 1 : userSettings?.difficulty === "medium" ? 2 : 3;
    const finalScore = score * difficultyMultiplier;

    // Add points when game ends
    addPoints(finalScore);
  };

  // Only render the full content after the component is mounted
  if (!mounted) {
    return <div className="bg-blue-50 min-h-screen p-8">Loading...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <GameHeader title="Level 1" showPlayAgain={!isActive} onPlayAgain={restartGame} returnPath="/games/division" />
      <div className="flex flex-col items-center justify-center h-[calc(90vh-120px)] p-8 bg-blue-50">
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main game area */}
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

                {/* Timer display */}
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
                  <span className="text-gray-700 mx-3">÷</span>
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
                        onChange={(e) => isActive && setUserAnswer(e.target.value)}
                        className="w-full p-4 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Enter your answer"
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
                  </div>
                </form>

                {feedback && <div className="p-3 text-center text-lg rounded-lg mb-4 bg-red-100 text-red-800">{feedback}</div>}
              </div>
            </div>
          </div>

          {/* Numpad card on the right */}
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
