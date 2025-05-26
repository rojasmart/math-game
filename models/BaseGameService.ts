"use client";
import { Difficulty } from "./GameTypes";

// Base class for game settings
export class BaseGameService {
  // Get default time based on difficulty
  static getDefaultTime(difficulty: Difficulty): number {
    switch (difficulty) {
      case "easy":
        return 15;
      case "medium":
        return 10;
      case "hard":
        return 7;
      default:
        return 10;
    }
  }

  // Calculate score multiplier based on difficulty
  static getDifficultyMultiplier(difficulty: Difficulty): number {
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
  }

  // Calculate time bonus based on difficulty
  static getTimeBonus(difficulty: Difficulty): number {
    switch (difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 2;
      case "hard":
        return 1;
      default:
        return 2;
    }
  }

  // Calculate time penalty based on difficulty
  static getTimePenalty(difficulty: Difficulty): number {
    switch (difficulty) {
      case "easy":
        return -3;
      case "medium":
        return -2;
      case "hard":
        return -1;
      default:
        return -2;
    }
  }

  // Calculate points to add based on difficulty
  static getPointsToAdd(difficulty: Difficulty): number {
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
  }
}
