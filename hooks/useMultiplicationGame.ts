"use client";
import { useState } from "react";
import { useGame } from "./useGame";
import { Difficulty } from "../models/GameTypes";
import { MultiplicationGameService } from "../models/MultiplicationGameService";

interface UseMultiplicationGameProps {
  level: 1 | 2 | 3 | 4;
  difficulty?: Difficulty;
}

export const useMultiplicationGame = ({ level, difficulty }: UseMultiplicationGameProps) => {
  // State for problem numbers
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [result, setResult] = useState(0);

  // Generate problem based on level
  const generateProblem = () => {
    const currentDifficulty = difficulty || "medium";

    switch (level) {
      case 1:
        const level1Problem = MultiplicationGameService.generateLevel1(currentDifficulty);
        setNum1(level1Problem.num1);
        setNum2(level1Problem.num2);
        setResult(level1Problem.result);
        break;
      case 2:
        const level2Problem = MultiplicationGameService.generateLevel2(currentDifficulty);
        setNum1(level2Problem.num1);
        setResult(level2Problem.result);
        break;
      case 3:
        const level3Problem = MultiplicationGameService.generateLevel3(currentDifficulty);
        setNum1(level3Problem.num1);
        setNum2(level3Problem.num2);
        setNum3(level3Problem.num3);
        setResult(level3Problem.result);
        break;
      case 4:
        const level4Problem = MultiplicationGameService.generateLevel4(currentDifficulty);
        setNum1(level4Problem.num1);
        setNum2(level4Problem.num2);
        setNum3(level4Problem.num3);
        setNum4(level4Problem.num4);
        setResult(level4Problem.result);
        break;
    }
  };

  // Check answer based on level
  const checkAnswer = (userAnswer: string) => {
    const userNum = parseInt(userAnswer);

    switch (level) {
      case 1:
        return userNum === num1 * num2;
      case 2:
        return userNum === result / num1;
      case 3:
        return userNum === result / (num1 * num2 * num3);
      case 4:
        return userNum === result / (num1 * num2 * num3 * num4);
      default:
        return false;
    }
  };

  // Use the base game hook
  const gameHook = useGame({
    difficulty,
    generateProblem,
    checkAnswer,
  });

  return {
    num1,
    num2,
    num3,
    num4,
    result,
    ...gameHook,
  };
};
