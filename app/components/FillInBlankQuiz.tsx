import React, { useRef, useState } from "react";
import { FillInBlankQuizField } from "../lib/entities";

interface FillInBlankQuizProps {
  quizField: FillInBlankQuizField;
  handleAnswerChange: (ans: any) => void;
  currentAnswer: any;
}

const FillInBlankQuiz: React.FC<FillInBlankQuizProps> = ({
  quizField,
  handleAnswerChange,
  currentAnswer,
}) => {
  const inputsRef = useRef<any[]>([]);
  //
  // const ansUI = [];
  // for (const char of quizField.correctAnswer) {
  //   if (char === " ") {
  //     ansUI.push("space");
  //     continue;
  //   }
  //   ansUI.push("input");
  // }

  function handleCharChange(e: any, i: number) {
    console.log("char change");
    let value = e.target.value;
    value = value[value.length - 1] || "";
    //update chars
    const newAnswer = [...currentAnswer];
    newAnswer[i] = value;
    handleAnswerChange(newAnswer);
    //move focus to next adjacent input if there's any
    if (i !== currentAnswer.length - 1) {
      inputsRef.current[i + 1].focus();
    }
  }

  function handleKeydown(e: any, i: number) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (i === 0 && currentAnswer[i]) {
        const newAnswer = [...currentAnswer];
        newAnswer[i] = "";
        handleAnswerChange(newAnswer);
        inputsRef.current[i].focus();
        return;
      }
      if (i > 0) {
        if (currentAnswer[i]) {
          const newAnswer = [...currentAnswer];
          newAnswer[i] = "";
          handleAnswerChange(newAnswer);
          inputsRef.current[i].focus();
        } else {
          const newAnswer = [...currentAnswer];
          newAnswer[i - 1] = "";
          handleAnswerChange(newAnswer);
          inputsRef.current[i - 1].focus();
        }
      }
    }
  }

  return (
    <div>
      <h1>{quizField.question}</h1>
      <div className="flex gap-1">
        {currentAnswer.map((char: any, i: number) => (
          <input
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            key={i}
            className="border border-black w-5 h-5"
            value={currentAnswer[i]}
            onKeyDown={(e) => handleKeydown(e, i)}
            onChange={(e) => handleCharChange(e, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default FillInBlankQuiz;
