"use client";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Difficulty, GameState, TimeChange } from "../models/GameTypes";
import { BaseGameService } from "../models/BaseGameService";

interface UseGameProps {
  difficulty?: Difficulty;
  generateProblem: () => void;
  checkAnswer: (userAnswer: string) => boolean;
}

export const useGame = ({ difficulty, generateProblem, checkAnswer }: UseGameProps) => {
  const { userSettings, addPoints } = useUser();
  const [mounted, setMounted] = useState(false);

  // Get default time based on difficulty
  const getDefaultTime = () => {
    if (!difficulty && userSettings?.difficulty) {
      return BaseGameService.getDefaultTime(userSettings.difficulty);
    }
    return BaseGameService.getDefaultTime(difficulty || "medium");
  };

  // Game state
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(getDefaultTime());
  const [isActive, setIsActive] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [timeChange, setTimeChange] = useState<TimeChange>({ value: 0, isShowing: false });
  const [showNumPad, setShowNumPad] = useState(true);

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
    let interval: NodeJS.Timeout | undefined;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
      handleGameOver();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
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
          handleSubmit();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isActive, userAnswer]);

  // Form submission
  const handleSubmit = () => {
    if (isActive && userAnswer) {
      const isCorrect = checkAnswer(userAnswer);
      setTotalQuestions((prev) => prev + 1);

      if (isCorrect) {
        setFeedback("");
        setScore((prev) => prev + 1);

        const currentDifficulty = difficulty || userSettings?.difficulty || "medium";
        const pointsToAdd = BaseGameService.getPointsToAdd(currentDifficulty);
        addPoints(pointsToAdd);

        const timeBonus = BaseGameService.getTimeBonus(currentDifficulty);
        setTimeRemaining((time) => time + timeBonus);
        setTimeChange({ value: timeBonus, isShowing: true });

        setTimeout(() => setFeedback(""), 1500);
        setTimeout(generateProblem, 500);
        setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
      } else {
        const currentDifficulty = difficulty || userSettings?.difficulty || "medium";
        const timePenalty = BaseGameService.getTimePenalty(currentDifficulty);
        setTimeRemaining((time) => Math.max(0, time + timePenalty));
        setTimeChange({ value: timePenalty, isShowing: true });

        setTimeout(() => {
          setFeedback("");
          generateProblem();
        }, 1500);

        setTimeout(() => setTimeChange({ value: 0, isShowing: false }), 1500);
      }

      setUserAnswer("");
    }
  };

  const handleGameOver = () => {
    setIsActive(false);
    const currentDifficulty = difficulty || userSettings?.difficulty || "medium";
    const difficultyMultiplier = BaseGameService.getDifficultyMultiplier(currentDifficulty);
    const finalScore = score * difficultyMultiplier;
    addPoints(finalScore);
  };

  const restartGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setTimeRemaining(getDefaultTime());
    setIsActive(true);
    setUserAnswer("");
    setFeedback("");
    generateProblem();
  };

  return {
    // State
    mounted,
    score,
    totalQuestions,
    timeRemaining,
    isActive,
    feedback,
    userAnswer,
    timeChange,
    showNumPad,

    // Methods
    setUserAnswer,
    setShowNumPad,
    handleSubmit,
    handleGameOver,
    restartGame,

    // Helper methods
    getDefaultTime,
  };
};
