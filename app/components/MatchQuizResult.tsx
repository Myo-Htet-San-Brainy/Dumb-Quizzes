import React from "react";
import { MatchQuizFieldResult } from "../lib/entities";

const MatchResult: React.FC<MatchQuizFieldResult> = (props) => {
  // Check if currentAnswer exists, if not use empty array
  const currentAnswer = props.currentAnswer || [];

  // Extract unique items from left and right columns
  const leftItems = [...new Set(props.correctAnswer.map((pair) => pair[0]))];
  const rightItems = [...new Set(props.correctAnswer.map((pair) => pair[1]))];

  // Create a map of correct pairs for easy lookup
  const correctPairsMap = new Map();
  props.correctAnswer.forEach((pair) => {
    correctPairsMap.set(pair[0], pair[1]);
  });

  // Create a map of user's pairs for easy lookup
  const userPairsMap = new Map();
  currentAnswer.forEach((pair) => {
    userPairsMap.set(pair[0], pair[1]);
  });

  // Function to check if a user pair is correct
  const isPairCorrect = (leftItem: string, rightItem: string) => {
    return correctPairsMap.get(leftItem) === rightItem;
  };

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

      {/* Matching Results */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left border-b border-gray-200">Item</th>
              <th className="p-3 text-left border-b border-gray-200">
                Your Match
              </th>
              <th className="p-3 text-left border-b border-gray-200">
                Correct Match
              </th>
              <th className="p-3 text-center border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leftItems.map((leftItem, index) => {
              const correctRightItem = correctPairsMap.get(leftItem);
              let userRightItem = userPairsMap.get(leftItem);
              userRightItem = userRightItem.startsWith("droppable-")
                ? "You did not answer this."
                : userRightItem;
              const isCorrect = isPairCorrect(leftItem, userRightItem);

              return (
                <tr key={index} className="border-b border-gray-100">
                  {/* Left Item */}
                  <td className="p-3 font-medium">{leftItem}</td>

                  {/* User's Match */}
                  <td className="p-3">
                    <div
                      className={`p-2 rounded ${
                        isCorrect
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      {userRightItem}
                    </div>
                  </td>

                  {/* Correct Match */}
                  <td className="p-3">
                    <div className="p-2 bg-green-50 border border-green-200 rounded">
                      {correctRightItem}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3 text-center">
                    {userRightItem ? (
                      isCorrect ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700">
                          ✗
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                        -
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchResult;
