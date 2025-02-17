import React, { useEffect, useState } from "react";
import { quiz } from "../lib/static";
import {
  isSelectQuizField,
  isTextQuizField,
  SelectQuizField,
  TextQuizField,
} from "../lib/entities";
import TextQuiz from "./TextQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";

const answers: any[] = [];

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const { quizFields } = quiz;
  const currentQuiz = quizFields[currentQuizIndex];
  const [currentAnswer, setCurrentAnswer] = useState<any>("");
  console.log(answers);

  useEffect(() => {
    //set to value at changed index in array, if undefined, reset to null
    const valueAtCurrentIndex = answers[currentQuizIndex];
    setCurrentAnswer(
      valueAtCurrentIndex === undefined ? "" : valueAtCurrentIndex
    );
  }, [currentQuizIndex]);

  function handleAnswerChange(ans: string) {
    setCurrentAnswer(ans);
  }

  function handleNext() {
    //set current ans to array
    answers[currentQuizIndex] = currentAnswer;

    //change index
    changeQuizIndex("next");
  }

  function handlePrev() {
    //set current ans to array
    answers[currentQuizIndex] = currentAnswer;

    //change index
    changeQuizIndex("prev");
  }

  function changeQuizIndex(action: "next" | "prev") {
    switch (action) {
      case "next":
        if (currentQuizIndex !== quizFields.length - 1) {
          //change the index
          setCurrentQuizIndex((prev) => prev + 1);
        }
        break;
      case "prev":
        if (currentQuizIndex !== 0) {
          //change the index
          setCurrentQuizIndex((prev) => prev - 1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {renderQuiz(currentQuiz, handleAnswerChange, currentAnswer)}
      {/* PREV AND NEXT BTNS */}
      {currentQuizIndex === quizFields.length - 1 ? (
        false
      ) : (
        <button className="text-xl bg-gray-300 rounded-md" onClick={handleNext}>
          next quiz
        </button>
      )}
      {currentQuizIndex === 0 ? (
        false
      ) : (
        <button className="text-xl bg-gray-300 rounded-md" onClick={handlePrev}>
          prev quiz
        </button>
      )}
    </div>
  );
};

export default Quiz;

function renderQuiz(
  currentQuiz: TextQuizField | SelectQuizField,
  handleAnswerChange: (ans: string) => void,
  currentAnswer: any
) {
  if (isTextQuizField(currentQuiz)) {
    return (
      <TextQuiz
        quizField={currentQuiz}
        handleAnswerChange={handleAnswerChange}
        currentAnswer={currentAnswer}
      />
    );
  } else if (isSelectQuizField(currentQuiz)) {
    return (
      <MultipleChoiceQuiz
        quizField={currentQuiz}
        handleAnswerChange={handleAnswerChange}
        currentAnswer={currentAnswer}
      />
    );
  }

  return <h1>UI</h1>;
}
