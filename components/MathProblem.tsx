"use client";
import React from "react";
import { MathOperation } from "../models/GameTypes";

interface MathProblemProps {
  operation: MathOperation;
  level: number;
  numbers: number[];
  result?: number;
  showResultField?: boolean;
  missingNumberIndex?: number; // The index of the number that is missing (to be replaced with a placeholder)
}

const MathProblem: React.FC<MathProblemProps> = ({ operation, level, numbers, result, showResultField = true, missingNumberIndex }) => {
  // Get operation symbol
  const getOperationSymbol = (op: MathOperation) => {
    switch (op) {
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      case "multiplication":
        return "×";
      case "division":
        return "÷";
      default:
        return "+";
    }
  };

  const symbol = getOperationSymbol(operation);

  return (
    <div className="flex justify-center md:justify-start items-center mb-8 text-5xl font-bold flex-wrap">
      {numbers.map((num, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-700 mx-3">{symbol}</span>}
          {missingNumberIndex === index ? (
            <span className="text-blue-600 bg-gray-100 px-4 py-2 rounded-lg">?</span>
          ) : (
            <span className="text-blue-600">{num}</span>
          )}
        </React.Fragment>
      ))}

      {showResultField && (
        <>
          <span className="text-gray-700 mx-3">=</span>
          <span className="text-blue-500">{result}</span>
        </>
      )}
    </div>
  );
};

export default MathProblem;
