import React from "react";
import { TextQuizField } from "../lib/entities";
import { useStore } from "../lib/globalState";

interface TextQuizProps {
  quizField: TextQuizField;
}

const TextQuiz: React.FC<TextQuizProps> = ({ quizField }) => {
  const { changeCurrentAnswer } = useStore();

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {quizField.question}
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <label className="block text-gray-600 mb-2 text-sm font-medium">
          Your Answer:
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          type={quizField.type}
          onChange={(e) =>
            changeCurrentAnswer(quizField.id, e.currentTarget.value)
          }
          value={quizField.currentAnswer ?? ""}
          placeholder="Type your answer here..."
        />
      </div>
    </div>
  );
};

export default TextQuiz;
