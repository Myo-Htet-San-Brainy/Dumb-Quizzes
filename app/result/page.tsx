"use client";

import React from "react";
import { useStore } from "../lib/globalState";
import {
  FillInBlankQuizField,
  FillInBlankQuizFieldResult,
  isFillInBlankQuizField,
  isMatchQuizField,
  isSelectQuizField,
  MatchQuizField,
  MatchQuizFieldResult,
  QuizField,
  SelectQuizField,
  SelectQuizFieldResult,
} from "../lib/entities";
import FillInBlankResult from "../components/FillInBlankResult";
import SelectResult from "../components/SelectResult";
import MatchResult from "../components/MatchQuizResult";

const Result = () => {
  const { quizFields } = useStore();
  console.log(useStore.getState());

  return (
    <div>
      {quizFields.map((quizField) => {
        return checkAndRenderResult(quizField);
      })}
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
