"use client";
import { useEffect, useState } from "react";
import { Difficulty } from "../models/GameTypes";
import { BaseGameService } from "../models/BaseGameService";

interface TimerProps {
  initialTime: number; // Time in seconds
  onTimeUp?: () => void; // Callback function when time is up
  timeRemaining?: number; // Current time remaining (for controlled component)
  setTimeRemaining?: (time: number) => void; // Setter for time remaining
  difficulty?: Difficulty; // Difficulty level
  timeChange?: {
    value: number;
    isShowing: boolean;
  };
  isActive?: boolean; // Whether the timer is active
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeUp,
  timeRemaining,
  setTimeRemaining,
  difficulty = "medium",
  timeChange = { value: 0, isShowing: false },
  isActive = true,
}) => {
  // For uncontrolled component
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const getDefaultTime = () => (difficulty ? BaseGameService.getDefaultTime(difficulty) : initialTime);

  // For uncontrolled mode
  useEffect(() => {
    if (!setTimeRemaining && timeLeft > 0 && isActive) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp, setTimeRemaining, isActive]);

  // Use controlled or uncontrolled time value
  const currentTime = timeRemaining !== undefined ? timeRemaining : timeLeft;

  return (
    <div className="w-full bg-gray-100 p-3 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-600">Time:</span>
        <div className="flex items-center">
          <div className={`text-xl font-bold ${currentTime <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>{currentTime}</div>
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
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${currentTime <= 10 ? "bg-red-500" : "bg-blue-500"}`}
          style={{
            width: `${(currentTime / getDefaultTime()) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
