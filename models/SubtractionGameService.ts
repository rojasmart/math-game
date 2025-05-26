"use client";
import { Difficulty } from "./GameTypes";

export class SubtractionGameService {
  static generateLevel1(difficulty: Difficulty): { num1: number; num2: number; result: number } {
    let maxNum1 = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100;

    const num1 = Math.floor(Math.random() * maxNum1) + 1;
    // Make sure num2 is smaller than num1 to avoid negative results
    const num2 = Math.floor(Math.random() * num1) + 1;

    return {
      num1,
      num2,
      result: num1 - num2,
    };
  }

  static generateLevel2(difficulty: Difficulty): { num1: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    // Generate answer (what to subtract) that's less than num1
    const answer = Math.floor(Math.random() * num1) + 1;
    const result = num1 - answer;

    return {
      num1,
      result,
      answer,
    };
  }

  static generateLevel3(difficulty: Difficulty): { result: number; num2: number; answer: number } {
    let maxNum = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100;

    // For "? - num2 = result", we first generate num2 and result, then calculate answer
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const result = Math.floor(Math.random() * maxNum) + 1;
    const answer = result + num2; // The missing first number

    return {
      result,
      num2,
      answer,
    };
  }

  static generateLevel4(difficulty: Difficulty): { num1: number; num2: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 30 : difficulty === "medium" ? 60 : 100;

    // For "a - b - ? = result"
    const num1 = Math.floor(Math.random() * maxNum) + 10; // Ensure num1 is large enough
    const num2 = Math.floor(Math.random() * (num1 / 2)) + 1; // Ensure num2 < num1
    const result = Math.floor(Math.random() * (num1 - num2)) + 1; // Ensure result < (num1 - num2)

    // Calculate what the answer should be: num1 - num2 - answer = result
    // So answer = num1 - num2 - result
    const answer = num1 - num2 - result;

    return {
      num1,
      num2,
      result,
      answer,
    };
  }
}
