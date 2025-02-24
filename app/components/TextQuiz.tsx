import React from "react";
import { quiz } from "../lib/static";
import { TextQuizField } from "../lib/entities";
import { useStore } from "../lib/globalState";

interface TextQuizProps {
  quizField: TextQuizField;
}

const TextQuiz: React.FC<TextQuizProps> = ({ quizField }) => {
  const { changeCurrentAnswer } = useStore();

  return (
    <div>
      <h1>{quizField.question}</h1>
      <input
        className="border border-black"
        type={quizField.type}
        onChange={(e) =>
          changeCurrentAnswer(quizField.id, e.currentTarget.value)
        }
        value={quizField.currentAnswer ?? ""}
      />
    </div>
  );
};

export default TextQuiz;
