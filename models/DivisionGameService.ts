"use client";
import { Difficulty } from "./GameTypes";

export class DivisionGameService {
  static generateLevel1(difficulty: Difficulty): { num1: number; num2: number; result: number } {
    // For "a ÷ b = result"
    let maxDivisor = difficulty === "easy" ? 10 : difficulty === "medium" ? 12 : 15;
    let maxMultiplier = difficulty === "easy" ? 10 : difficulty === "medium" ? 12 : 15;

    // Generate divisor and multiplier to ensure clean division
    const divisor = Math.floor(Math.random() * maxDivisor) + 1;
    const multiplier = Math.floor(Math.random() * maxMultiplier) + 1;

    // Calculate dividend
    const dividend = divisor * multiplier;

    return {
      num1: dividend,
      num2: divisor,
      result: multiplier,
    };
  }

  static generateLevel2(difficulty: Difficulty): { num2: number; result: number; answer: number } {
    // For "? ÷ b = result"
    let maxDivisor = difficulty === "easy" ? 10 : difficulty === "medium" ? 12 : 20;
    let maxResult = difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20;

    const divisor = Math.floor(Math.random() * maxDivisor) + 1;
    const result = Math.floor(Math.random() * maxResult) + 1;

    // Calculate the dividend (which is the answer)
    const answer = divisor * result;

    return {
      num2: divisor,
      result,
      answer,
    };
  }

  static generateLevel3(difficulty: Difficulty): { num1: number; num2: number; result: number; answer: number } {
    // For "a ÷ b ÷ ? = result"
    let finalResultMax = difficulty === "easy" ? 5 : difficulty === "medium" ? 8 : 10;
    let maxSecondDivisor = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : 9;
    let maxThirdDivisor = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : 9;

    const finalResult = Math.floor(Math.random() * finalResultMax) + 1;
    const secondDivisor = Math.floor(Math.random() * (maxSecondDivisor - 1)) + 2; // Avoid division by 1
    const thirdDivisor = Math.floor(Math.random() * (maxThirdDivisor - 1)) + 2; // Avoid division by 1

    // Calculate the first number by working backwards
    const firstNumber = finalResult * secondDivisor * thirdDivisor;

    return {
      num1: firstNumber,
      num2: secondDivisor,
      result: finalResult,
      answer: thirdDivisor,
    };
  }

  static generateLevel4(difficulty: Difficulty): { num1: number; num2: number; num3: number; result: number; answer: number } {
    // For "a ÷ b ÷ c ÷ ? = result"
    let finalResultMax = difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 7;
    let maxDivisor = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : 9;

    const finalResult = Math.floor(Math.random() * finalResultMax) + 1;
    const secondDivisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Avoid division by 1
    const thirdDivisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Avoid division by 1
    const fourthDivisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Avoid division by 1

    // Calculate the first number by working backwards
    const firstNumber = finalResult * secondDivisor * thirdDivisor * fourthDivisor;

    return {
      num1: firstNumber,
      num2: secondDivisor,
      num3: thirdDivisor,
      result: finalResult,
      answer: fourthDivisor,
    };
  }
}
