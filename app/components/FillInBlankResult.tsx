import React from "react";
import { FillInBlankQuizFieldResult } from "../lib/entities";

const FillInBlankResult: React.FC<FillInBlankQuizFieldResult> = (props) => {
  // Ensure currentAnswer is an array, even if it's undefined
  const currentAnswerArray = props.currentAnswer || [];
  const correctAnswerArray = [...props.correctAnswer];

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
        <div className="flex  flex-wrap gap-1">
          {correctAnswerArray.map((char, index) => (
            <div
              key={index}
              className={` w-9 h-9  border rounded-md border-green-500 bg-green-50 text-green-700 flex items-center justify-center`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* User's Answer */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Your Answer:</div>
        <div className="flex flex-wrap gap-1">
          {currentAnswerArray.map((char, index) => (
            <div
              key={index}
              className={` w-9 h-9  border rounded-md flex items-center justify-center ${
                char === correctAnswerArray[index]
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-red-500 bg-red-50 text-red-700"
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FillInBlankResult;
