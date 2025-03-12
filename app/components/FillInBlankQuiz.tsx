import React from "react";
import { FillInBlankQuizField } from "../lib/entities";
import { useStore } from "../lib/globalState";
import SplitInput from "./SplitInput";

interface FillInBlankQuizProps {
  quizField: FillInBlankQuizField;
}

const FillInBlankQuiz: React.FC<FillInBlankQuizProps> = ({ quizField }) => {
  const { changeCurrentAnswer: handleCurrentAnsChange } = useStore();

  function changeCurrentAnswer(newValue: any[]) {
    handleCurrentAnsChange(quizField.id, newValue);
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {quizField.question}
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <p className="text-gray-600 mb-2 text-sm font-medium">
          Fill in the blank:
        </p>
        <SplitInput
          currentAnswer={quizField.currentAnswer}
          changeCurrentAnswer={changeCurrentAnswer}
        />

        <div className="mt-4 text-sm text-gray-500">
          <p>Type your answer in the blank space provided.</p>
        </div>
      </div>
    </div>
  );
};

export default FillInBlankQuiz;
