import React from "react";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="score-container">
      <h2 className="text-lg font-bold">Current Score: {score}</h2>
    </div>
  );
};

export default Score;
