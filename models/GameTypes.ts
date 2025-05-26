"use client";

// Game operation types
export type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

// Common types
export type Difficulty = "easy" | "medium" | "hard";

// Game level information
export interface GameLevel {
  id: string;
  description: string;
  example: string;
  color: string;
  icon: string;
  requiredPoints: number;
}

// Game state interface
export interface GameState {
  score: number;
  totalQuestions: number;
  timeRemaining: number;
  isActive: boolean;
  feedback: string;
  userAnswer: string;
  timeChange: TimeChange;
  showNumPad: boolean;
}

export interface TimeChange {
  value: number;
  isShowing: boolean;
}

// Problem state interface - generic for all game types
export interface ProblemState {
  numbers: number[];
  result: number;
}

// Game Settings from user context
export interface GameSettings {
  difficulty: Difficulty;
  soundEnabled: boolean;
  points: number;
  name: string;
}

// Game Results
export interface GameResult {
  score: number;
  finalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  timeElapsed: number;
  difficulty: Difficulty;
}
