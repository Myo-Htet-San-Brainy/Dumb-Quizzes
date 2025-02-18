import React, { useEffect, useState } from "react";
import { quiz } from "../lib/static";
import {
  isFillInBlankQuizField,
  isMatchQuizField,
  isSelectQuizField,
  isTextQuizField,
  QuizField,
  SelectQuizField,
  TextQuizField,
} from "../lib/entities";
import TextQuiz from "./TextQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import FillInBlankQuiz from "./FillInBlankQuiz";
import MatchQuiz from "./MatchQuiz";

const answers: any[] = [];

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const { quizFields } = quiz;
  const currentQuiz = quizFields[currentQuizIndex];
  const [currentAnswer, setCurrentAnswer] = useState<any>("");
  // console.log(answers);
  console.log(currentAnswer);

  function handleAnswerChange(ans: any) {
    setCurrentAnswer(ans);
  }

  function onNewQuiz() {
    //save current ans to array
    answers[currentQuizIndex] = currentAnswer;

    //set next quiz's currentAnswer value
    const newAnswer = answers[currentQuizIndex + 1];
    const newQuiz = quizFields[currentQuizIndex + 1];
    if (newAnswer === undefined) {
      if (isFillInBlankQuizField(newQuiz)) {
        setCurrentAnswer(Array(newQuiz.correctAnswer.length).fill(""));
      } else if (isMatchQuizField(newQuiz)) {
        setCurrentAnswer({
          answerables: newQuiz.correctAnswer.map((item) => item[0]),
          actualAnswers: newQuiz.correctAnswer.map((item) => ["", item[1]]),
        });
      } else {
        setCurrentAnswer("");
      }
    } else {
      setCurrentAnswer(newAnswer);
    }
  }

  function handleNext() {
    if (currentQuizIndex === quizFields.length - 1) return;
    onNewQuiz();
    //
    setCurrentQuizIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (currentQuizIndex === 0) return;
    onNewQuiz();
    //
    setCurrentQuizIndex((prev) => prev - 1);
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
  } else if (isMatchQuizField(currentQuiz)) {
    return (
      <MatchQuiz
        quizField={currentQuiz}
        handleAnswerChange={handleAnswerChange}
        currentAnswer={currentAnswer}
      />
    );
  }
}
