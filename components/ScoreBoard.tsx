import React from "react";

interface ScoreBoardProps {
  scores: { player: string; score: number }[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="score-board">
      <h2 className="text-lg font-bold">Score Board</h2>
      <ul className="list-disc pl-5">
        {scores.map((item, index) => (
          <li key={index} className="mb-2">
            {item.player}: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
