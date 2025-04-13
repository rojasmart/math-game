import React from "react";
import MathProblem from "./MathProblem";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";

const GameBoard = () => {
  return (
    <div className="game-board">
      <Timer />
      <MathProblem />
      <ScoreBoard />
    </div>
  );
};

export default GameBoard;
