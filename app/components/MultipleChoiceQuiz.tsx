import React from "react";
import { SelectQuizField } from "../lib/entities";
import { useStore } from "../lib/globalState";

interface MultipleChoiceQuizProps {
  quizField: SelectQuizField;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  quizField,
}) => {
  const { changeCurrentAnswer } = useStore();

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {quizField.question}
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <p className="text-gray-600 mb-2 text-sm font-medium">Select one:</p>

        <div className="space-y-3">
          {quizField.options?.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                quizField.currentAnswer === option.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400"
              } cursor-pointer transition duration-200`}
            >
              {/* Radio Button */}
              <input
                type="radio"
                name={quizField.id}
                checked={quizField.currentAnswer === option.id}
                onChange={() => changeCurrentAnswer(quizField.id, option.id)}
                className="w-5 h-5 cursor-pointer accent-indigo-600"
              />
              {/* Option Text */}
              <span className="text-gray-800 font-medium">{option.value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
