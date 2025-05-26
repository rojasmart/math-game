"use client";
import { Difficulty } from "./GameTypes";

export class MultiplicationGameService {
  static generateLevel1(difficulty: Difficulty): { num1: number; num2: number; result: number } {
    let maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 12 : 15;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;

    return {
      num1,
      num2,
      result: num1 * num2,
    };
  }

  static generateLevel2(difficulty: Difficulty): { num1: number; result: number; answer: number } {
    let maxNum1 = difficulty === "easy" ? 10 : difficulty === "medium" ? 12 : 15;

    // For "a × ? = result"
    const num1 = Math.floor(Math.random() * maxNum1) + 1;

    // Choose answer (missing factor) based on difficulty
    let maxAnswer = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 12;
    const answer = Math.floor(Math.random() * maxAnswer) + 1;

    const result = num1 * answer;

    return {
      num1,
      result,
      answer,
    };
  }

  static generateLevel3(difficulty: Difficulty): { num1: number; num2: number; num3: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 5 : difficulty === "medium" ? 7 : 10;

    // For "a × b × c × ? = result"
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const num3 = Math.floor(Math.random() * maxNum) + 1;

    // Choose answer (missing factor) with smaller range for higher difficulties
    let maxAnswer = difficulty === "easy" ? 5 : difficulty === "medium" ? 4 : 3;
    const answer = Math.floor(Math.random() * maxAnswer) + 1;

    const result = num1 * num2 * num3 * answer;

    return {
      num1,
      num2,
      num3,
      result,
      answer,
    };
  }

  static generateLevel4(difficulty: Difficulty): { num1: number; num2: number; num3: number; num4: number; result: number; answer: number } {
    // For level 4, we'll use smaller numbers to avoid huge results
    let maxNum = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const num3 = Math.floor(Math.random() * maxNum) + 1;
    const num4 = Math.floor(Math.random() * maxNum) + 1;

    // Choose answer (missing factor) - keep it small
    let maxAnswer = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
    const answer = Math.floor(Math.random() * maxAnswer) + 1;

    const result = num1 * num2 * num3 * num4 * answer;

    return {
      num1,
      num2,
      num3,
      num4,
      result,
      answer,
    };
  }
}
