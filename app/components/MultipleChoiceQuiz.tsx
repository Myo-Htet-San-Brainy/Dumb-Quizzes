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
    <div>
      <h1>{quizField.question}</h1>
      {quizField.options?.map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* Radio Button */}
          <input
            type="radio"
            name="quiz"
            // value={option.id}
            checked={quizField.currentAnswer === option.id}
            onChange={() => changeCurrentAnswer(quizField.id, option.id)}
            className="w-5 h-5 cursor-pointer"
          />
          {/* Option Text */}
          <span>{option.value}</span>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceQuiz;
