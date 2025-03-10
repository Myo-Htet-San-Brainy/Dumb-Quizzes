import React from "react";
import { SelectQuizFieldResult } from "../lib/entities";

const SelectResult: React.FC<SelectQuizFieldResult> = (props) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      {/* Question */}
      <div className="text-lg font-medium">{props.question}</div>

      {/* Status */}
      <div
        className={`font-semibold ${
          props.status ? "text-green-600" : "text-red-600"
        }`}
      >
        {props.status ? "Correct" : "Incorrect"}
      </div>

      {/* Options List */}
      <div className="flex flex-col gap-2">
        {props.options.map((option) => {
          // Determine styling based on whether this option is:
          // - The correct answer
          // - The user's answer
          // - Both correct and user's selection
          // - Neither
          const isCorrect = option.id === props.correctAnswer;
          const isSelected = option.id === props.currentAnswer;

          let bgColor = "bg-white";
          let borderColor = "border-gray-300";
          let textColor = "text-gray-800";

          if (isCorrect && isSelected) {
            // User selected the correct answer
            bgColor = "bg-green-50";
            borderColor = "border-green-500";
            textColor = "text-green-700";
          } else if (isCorrect) {
            // This is the correct answer but not selected
            bgColor = "bg-green-50";
            borderColor = "border-green-500";
            textColor = "text-green-700";
          } else if (isSelected) {
            // User selected this wrong answer
            bgColor = "bg-red-50";
            borderColor = "border-red-500";
            textColor = "text-red-700";
          }

          return (
            <div
              key={option.value}
              className={`p-3 border rounded-md flex items-center gap-3 ${bgColor} ${borderColor} ${textColor}`}
            >
              {/* Option marker */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  isSelected
                    ? isCorrect
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : isCorrect
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {isSelected && (
                  <span
                    className={isCorrect ? "text-green-700" : "text-red-700"}
                  >
                    ✓
                  </span>
                )}
                {!isSelected && isCorrect && (
                  <span className="text-green-700">✓</span>
                )}
              </div>

              {/* Option text */}
              <span>{option.value}</span>

              {/* Indicators */}
              <div className="ml-auto flex gap-2">
                {isCorrect && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                    Correct Answer
                  </span>
                )}
                {isSelected && !isCorrect && (
                  <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded">
                    Your Answer
                  </span>
                )}
                {isSelected && isCorrect && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                    Your Answer
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show message if no answer was provided */}
      {!props.currentAnswer && (
        <div className="p-3 border border-yellow-400 bg-yellow-50 text-yellow-800 rounded-md">
          No answer provided
        </div>
      )}
    </div>
  );
};

export default SelectResult;
