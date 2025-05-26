"use client";
import { useState } from "react";
import { useGame } from "./useGame";
import { Difficulty } from "../models/GameTypes";
import { DivisionGameService } from "../models/DivisionGameService";

interface UseDivisionGameProps {
  level: 1 | 2 | 3 | 4;
  difficulty?: Difficulty;
}

export const useDivisionGame = ({ level, difficulty }: UseDivisionGameProps) => {
  // State for problem numbers
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [result, setResult] = useState(0);

  // Generate problem based on level
  const generateProblem = () => {
    const currentDifficulty = difficulty || "medium";

    switch (level) {
      case 1:
        const level1Problem = DivisionGameService.generateLevel1(currentDifficulty);
        setNum1(level1Problem.num1);
        setNum2(level1Problem.num2);
        setResult(level1Problem.result);
        break;
      case 2:
        const level2Problem = DivisionGameService.generateLevel2(currentDifficulty);
        setNum2(level2Problem.num2);
        setResult(level2Problem.result);
        break;
      case 3:
        const level3Problem = DivisionGameService.generateLevel3(currentDifficulty);
        setNum1(level3Problem.num1);
        setNum2(level3Problem.num2);
        setResult(level3Problem.result);
        break;
      case 4:
        const level4Problem = DivisionGameService.generateLevel4(currentDifficulty);
        setNum1(level4Problem.num1);
        setNum2(level4Problem.num2);
        setNum3(level4Problem.num3);
        setResult(level4Problem.result);
        break;
    }
  };

  // Check answer based on level
  const checkAnswer = (userAnswer: string) => {
    const userNum = parseInt(userAnswer);

    switch (level) {
      case 1:
        return userNum === num1 / num2;
      case 2:
        return userNum === result * num2;
      case 3:
        return userNum === num1 / num2 / result;
      case 4:
        return userNum === num1 / num2 / num3 / result;
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
    result,
    ...gameHook,
  };
};
