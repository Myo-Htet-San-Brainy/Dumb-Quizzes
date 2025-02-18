import React, { useEffect, useState } from "react";
import { quiz } from "../lib/static";
import {
  isFillInBlankQuizField,
  isSelectQuizField,
  isTextQuizField,
  QuizField,
  SelectQuizField,
  TextQuizField,
} from "../lib/entities";
import TextQuiz from "./TextQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import FillInBlankQuiz from "./FillInBlankQuiz";

const answers: any[] = [];

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const { quizFields } = quiz;
  const currentQuiz = quizFields[currentQuizIndex];
  const [currentAnswer, setCurrentAnswer] = useState<any>("");
  // console.log(answers);
  console.log(currentAnswer);

  useEffect(() => {
    //set to value at changed index in array, if undefined, reset to null
    const valueAtCurrentIndex = answers[currentQuizIndex];
    if (currentQuiz.type === "fillInBlank") {
      setCurrentAnswer(
        valueAtCurrentIndex === undefined
          ? Array(currentQuiz.correctAnswer.length).fill("")
          : valueAtCurrentIndex
      );
    } else {
      setCurrentAnswer(
        valueAtCurrentIndex === undefined ? "" : valueAtCurrentIndex
      );
    }
  }, [currentQuizIndex]);

  function handleAnswerChange(ans: any) {
    setCurrentAnswer(ans);
  }

  function handleNext() {
    if (currentQuizIndex === quizFields.length - 1) return;
    //save current ans to array
    answers[currentQuizIndex] = currentAnswer;

    //set next quiz's currentAnswer value
    const newAnswer = answers[currentQuizIndex + 1];
    const newQuiz = quizFields[currentQuizIndex + 1];
    if (newAnswer === undefined) {
      if (newQuiz.type === "fillInBlank") {
        setCurrentAnswer(Array(newQuiz.correctAnswer.length).fill(""));
      } else {
        setCurrentAnswer("");
      }
    } else {
      setCurrentAnswer(newAnswer);
    }
    //
    setCurrentQuizIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (currentQuizIndex === 0) return;
    //save current ans to array
    answers[currentQuizIndex] = currentAnswer;

    //set next quiz's currentAnswer value
    const newAnswer = answers[currentQuizIndex - 1];
    const newQuiz = quizFields[currentQuizIndex - 1];
    if (newAnswer === undefined) {
      if (newQuiz.type === "fillInBlank") {
        setCurrentAnswer(Array(newQuiz.correctAnswer.length).fill(""));
      } else {
        setCurrentAnswer("");
      }
    } else {
      setCurrentAnswer(newAnswer);
    }
    //
    setCurrentQuizIndex((prev) => prev - 1);
  }

  function changeQuizIndex(action: "next" | "prev") {
    switch (action) {
      case "next":
        if (currentQuizIndex !== quizFields.length - 1) {
          //change the index
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
  currentQuiz: QuizField,
  handleAnswerChange: (ans: any) => void,
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
  } else if (isFillInBlankQuizField(currentQuiz)) {
    return (
      <FillInBlankQuiz
        quizField={currentQuiz}
        handleAnswerChange={handleAnswerChange}
        currentAnswer={currentAnswer}
      />
    );
  }
}
