import React, { useRef, useState } from "react";
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
    <div>
      <h1>{quizField.question}</h1>
      <SplitInput
        currentAnswer={quizField.currentAnswer}
        changeCurrentAnswer={changeCurrentAnswer}
      />
    </div>
  );
};

export default FillInBlankQuiz;
