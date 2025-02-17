import React from "react";
import { SelectQuizField } from "../lib/entities";

interface MultipleChoiceQuizProps {
  quizField: SelectQuizField;
  handleAnswerChange: (ans: string) => void;
  currentAnswer: any;
}
const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  quizField,
  handleAnswerChange,
  currentAnswer,
}) => {
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
            checked={currentAnswer === option.id}
            onChange={() => handleAnswerChange(option.id)}
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
