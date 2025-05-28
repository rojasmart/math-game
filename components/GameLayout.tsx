"use client";
import React, { ReactNode } from "react";
import GameHeader from "./GameHeader";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import NumPad from "./NumPad";
import { Difficulty, TimeChange } from "../models/GameTypes";

interface GameLayoutProps {
  title: string;
  returnPath: string;
  children: ReactNode;
  score: number;
  totalQuestions: number;
  timeRemaining: number;
  isActive: boolean;
  showPlayAgain: boolean;
  onPlayAgain: () => void;
  difficulty: Difficulty;
  timeChange: TimeChange;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  showNumPad: boolean;
  setShowNumPad: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  feedback?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  title,
  returnPath,
  children,
  score,
  totalQuestions,
  timeRemaining,
  isActive,
  showPlayAgain,
  onPlayAgain,
  difficulty,
  timeChange,
  userAnswer,
  setUserAnswer,
  showNumPad,
  setShowNumPad,
  onSubmit,
  feedback,
}) => {
  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <GameHeader title={title} showPlayAgain={showPlayAgain} onPlayAgain={onPlayAgain} returnPath={returnPath} />

      <div className="flex flex-col items-center justify-center h-[calc(90vh-120px)] p-8 bg-blue-50">
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setShowNumPad(!showNumPad)}
                    className={`text-sm px-4 py-2 rounded-lg flex items-center cursor-pointer transition-all shadow-sm
                    ${showNumPad ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}
                  >
                    {showNumPad ? "Hide Numpad" : "Show Numpad"}
                  </button>
                </div>

                {/* Timer component */}
                <Timer
                  initialTime={timeRemaining}
                  timeRemaining={timeRemaining}
                  difficulty={difficulty}
                  timeChange={timeChange}
                  isActive={isActive}
                />

                {/* Problem display - passed as children */}
                {children}

                {/* Answer form */}
                <form onSubmit={onSubmit} className="mb-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 mb-2">
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => isActive && setUserAnswer(e.target.value)}
                        className="w-full p-4 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Enter your answer"
                        disabled={!isActive}
                      />
                      <button
                        type="submit"
                        className={`${
                          isActive ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                        } text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer`}
                        disabled={!isActive}
                      >
                        Check
                      </button>
                    </div>
                  </div>
                </form>

                {/* Feedback message */}
                {feedback && <div className="p-3 text-center text-lg rounded-lg mb-4 bg-red-100 text-red-800">{feedback}</div>}

                {/* Score board */}
                <ScoreBoard score={score} totalQuestions={totalQuestions} difficulty={difficulty} />
              </div>
            </div>
          </div>

          {/* Numpad component */}
          {showNumPad && (
            <div className="md:w-80 h-80 p-6 bg-white rounded-xl border border-gray-200 shadow-md flex items-center justify-center">
              <NumPad
                isActive={isActive}
                onNumberClick={(num) => {
                  const newValue = `${userAnswer}${num}`;
                  setUserAnswer(newValue);
                }}
                onDeleteClick={() => {
                  const newValue = userAnswer.slice(0, -1);
                  setUserAnswer(newValue);
                }}
                onClearClick={() => setUserAnswer("")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
