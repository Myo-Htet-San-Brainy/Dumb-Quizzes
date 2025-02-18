import React from "react";
import { quiz } from "../lib/static";
import { MatchQuizField } from "../lib/entities";

interface MatchQuizProps {
  quizField: MatchQuizField;
  handleAnswerChange: (ans: string) => void;
  currentAnswer: {
    answerables: string[];
    actualAnswers: string[][];
  };
}

const MatchQuiz: React.FC<MatchQuizProps> = ({
  quizField,
  handleAnswerChange,
  currentAnswer,
}) => {
  return (
    <div>
      <h1>{quizField.question}</h1>
      <h1>Matchie</h1>
    </div>
  );
};

export default MatchQuiz;
