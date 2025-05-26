"use client";
import { Difficulty } from "./GameTypes";

export class AdditionGameService {
  static generateLevel1(difficulty: Difficulty): { num1: number; num2: number; result: number } {
    let maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;

    return {
      num1,
      num2,
      result: num1 + num2,
    };
  }

  static generateLevel2(difficulty: Difficulty): { num1: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const answer = Math.floor(Math.random() * maxNum) + 1;
    const result = num1 + answer;

    return {
      num1,
      result,
      answer,
    };
  }

  static generateLevel3(difficulty: Difficulty): { num1: number; num2: number; num3: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 25;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const num3 = Math.floor(Math.random() * maxNum) + 1;
    const answer = Math.floor(Math.random() * maxNum) + 1;
    const result = num1 + num2 + num3 + answer;

    return {
      num1,
      num2,
      num3,
      result,
      answer,
    };
  }

  static generateLevel4(difficulty: Difficulty): { num1: number; num2: number; num3: number; num4: number; result: number; answer: number } {
    let maxNum = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;

    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const num3 = Math.floor(Math.random() * maxNum) + 1;
    const num4 = Math.floor(Math.random() * maxNum) + 1;
    const answer = Math.floor(Math.random() * maxNum) + 1;
    const result = num1 + num2 + num3 + num4 + answer;

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
