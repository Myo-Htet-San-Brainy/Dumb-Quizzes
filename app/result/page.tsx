"use client";

import React from "react";
import { useStore } from "../lib/globalState";
import {
  FillInBlankQuizField,
  FillInBlankQuizFieldResult,
  isFillInBlankQuizField,
  isMatchQuizField,
  isSelectQuizField,
  isTextQuizField,
  MatchQuizField,
  MatchQuizFieldResult,
  QuizField,
  SelectQuizField,
  SelectQuizFieldResult,
  TextQuizField,
  TextQuizFieldResult,
} from "../lib/entities";
import FillInBlankResult from "../components/FillInBlankResult";
import SelectResult from "../components/SelectResult";
import MatchResult from "../components/MatchQuizResult";
import { ratio } from "fuzzball";
import TextQuizResult from "../components/TextQuizResult";

const Result = () => {
  const { quizFields } = useStore();
  // console.log(useStore.getState());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-10 ">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.5 16.5v-9l7 4.5-7 4.5z" />
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            </svg>
            <h1 className="text-2xl font-bold">QuizMaster</h1>
          </div>
        </div>
      </header>
      {quizFields?.map((quizField) => {
        return checkAndRenderResult(quizField);
      })}
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Result;

function checkAndRenderResult(quizField: QuizField): any {
  if (isSelectQuizField(quizField)) {
    return <SelectResult {...checkSelectQuizAnswer(quizField)} />;
  } else if (isFillInBlankQuizField(quizField)) {
    return <FillInBlankResult {...checkFillInBlankQuizAnswer(quizField)} />;
  } else if (isMatchQuizField(quizField)) {
    return <MatchResult {...checkMatchQuizAnswer(quizField)} />;
  } else if (isTextQuizField(quizField)) {
    return <TextQuizResult {...checkTextQuizAnswer(quizField)} />;
  }
}

function checkSelectQuizAnswer(
  selectQuizField: SelectQuizField
): SelectQuizFieldResult {
  return {
    ...selectQuizField,
    status: selectQuizField.currentAnswer === selectQuizField.correctAnswer,
  };
}

function checkFillInBlankQuizAnswer(
  fillInBlankQuiz: FillInBlankQuizField
): FillInBlankQuizFieldResult {
  let status = true;
  const correctAnswerArray = [...fillInBlankQuiz.correctAnswer];
  for (let index = 0; index < correctAnswerArray.length; index++) {
    if (correctAnswerArray[index] !== fillInBlankQuiz.currentAnswer?.[index]) {
      status = false;
      break;
    }
  }
  return {
    ...fillInBlankQuiz,
    status,
  };
}

function checkMatchQuizAnswer(matchQuiz: MatchQuizField): MatchQuizFieldResult {
  let status = true;
  for (let index = 0; index < matchQuiz.correctAnswer.length; index++) {
    if (!status) {
      break;
    }
    const correctAnsPair = matchQuiz.correctAnswer[index];
    for (let i = 0; i < (matchQuiz.currentAnswer?.length as number); i++) {
      const ansPair = matchQuiz.currentAnswer?.[i];
      if (ansPair?.[1] === correctAnsPair[1]) {
        status = ansPair?.[0] === correctAnsPair[0];
        break;
      }
    }
  }
  return { ...matchQuiz, status };
}

const correctThreshold = 80;
function checkTextQuizAnswer(textQuiz: TextQuizField): TextQuizFieldResult {
  let status = false;

  const correctnessVal = ratio(
    textQuiz.correctAnswer,
    textQuiz.currentAnswer as string
  );
  status = correctnessVal > correctThreshold;
  return { ...textQuiz, status };
}
