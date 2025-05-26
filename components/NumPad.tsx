"use client";
import React from "react";

interface NumPadProps {
  isActive: boolean;
  onNumberClick: (num: number) => void;
  onDeleteClick: () => void;
  onClearClick: () => void;
}

const NumPad: React.FC<NumPadProps> = ({ isActive, onNumberClick, onDeleteClick, onClearClick }) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-2 h-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => isActive && onNumberClick(num)}
            className={`${
              isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
            } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
            disabled={!isActive}
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          onClick={() => isActive && onDeleteClick()}
          className={`${
            isActive ? "bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300" : "bg-gray-100"
          } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
          disabled={!isActive}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => isActive && onNumberClick(0)}
          className={`${
            isActive ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300" : "bg-gray-100"
          } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
          disabled={!isActive}
        >
          0
        </button>
        <button
          type="button"
          onClick={() => isActive && onClearClick()}
          className={`${
            isActive ? "bg-red-100 hover:bg-red-200 active:bg-red-300" : "bg-gray-100"
          } text-gray-800 rounded-lg font-bold text-xl transition shadow-sm flex items-center justify-center`}
          disabled={!isActive}
        >
          C
        </button>
      </div>
    </div>
  );
};

export default NumPad;
