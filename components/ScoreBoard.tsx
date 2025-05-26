"use client";
import React from "react";
import { Difficulty } from "../models/GameTypes";

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  difficulty?: Difficulty;
  showMultiplier?: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, totalQuestions, difficulty = "medium", showMultiplier = true }) => {
  // Get multiplier based on difficulty
  const getDifficultyMultiplier = () => {
    switch (difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 1;
    }
  };

  const multiplier = getDifficultyMultiplier();
  const finalScore = score * multiplier;

  return (
    <div className="w-full bg-gray-100 p-3 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-2 text-gray-700">Score</h2>

      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Correct answers:</span>
        <span className="font-bold text-green-600">
          {score} / {totalQuestions}
        </span>
      </div>

      {showMultiplier && score > 0 && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Difficulty bonus (x{multiplier}):</span>
          <span className="font-bold text-blue-600">{finalScore}</span>
        </div>
      )}

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-green-500 rounded-full" style={{ width: totalQuestions > 0 ? `${(score / totalQuestions) * 100}%` : "0%" }} />
      </div>
    </div>
  );
};

export default ScoreBoard;
