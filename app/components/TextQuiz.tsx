import React from "react";
import { quiz } from "../lib/static";
import { TextQuizField } from "../lib/entities";

interface TextQuizProps {
  quizField: TextQuizField;
  handleAnswerChange: (ans: string) => void;
  currentAnswer: any;
}

const TextQuiz: React.FC<TextQuizProps> = ({
  quizField,
  handleAnswerChange,
  currentAnswer,
}) => {
  return (
    <div>
      <h1>{quizField.question}</h1>
      <input
        className="border border-black"
        type={quizField.type}
        onChange={(e) => handleAnswerChange(e.currentTarget.value)}
        value={currentAnswer}
      />
    </div>
  );
};

export default TextQuiz;
