import React from "react";

interface MathProblemProps {
  problem: string;
}

const MathProblem: React.FC<MathProblemProps> = ({ problem }) => {
  return (
    <div className="math-problem">
      <h2 className="text-lg font-bold">Solve the following problem:</h2>
      <p className="text-xl">{problem}</p>
    </div>
  );
};

export default MathProblem;
