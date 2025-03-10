import React from "react";
import { TextQuizFieldResult } from "../lib/entities";

const TextQuizResult: React.FC<TextQuizFieldResult> = (props) => {
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

      {/* Correct Answer */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Correct Answer:</div>
        <div className="p-3 border border-green-500 bg-green-50 rounded-md text-green-700">
          {props.correctAnswer}
        </div>
      </div>

      {/* User's Answer */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Your Answer:</div>
        {props.currentAnswer ? (
          <div
            className={`p-3 border rounded-md ${
              props.status
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-red-500 bg-red-50 text-red-700"
            }`}
          >
            {props.currentAnswer}
          </div>
        ) : (
          <div className="p-3 border border-gray-300 bg-gray-50 rounded-md text-gray-400 italic">
            No answer provided
          </div>
        )}
      </div>
    </div>
  );
};

export default TextQuizResult;
