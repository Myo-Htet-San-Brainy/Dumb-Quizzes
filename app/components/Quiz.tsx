import React, { useEffect, useState } from "react";
import { quiz } from "../lib/static";
import {
  isFillInBlankQuizField,
  isMatchQuizField,
  isReOrderQuizField,
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
import { shuffleArray } from "../lib/utils";
import { useStore } from "../lib/globalState";
import Link from "next/link";

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const { quizFields, changeCurrentAnswer } = useStore();
  const currentQuiz = quizFields[currentQuizIndex];
  const isLastQuiz = quizFields.length - 1 === currentQuizIndex;

  console.log(useStore.getState());

  useEffect(() => {
    if (!currentQuiz.currentAnswer) {
      if (isFillInBlankQuizField(currentQuiz)) {
        const defaultCurrAns = [...currentQuiz.correctAnswer].map((char) => {
          if (char === " ") {
            return " ";
          }
          return "";
        });
        changeCurrentAnswer(currentQuiz.id, defaultCurrAns);
      } else if (isMatchQuizField(currentQuiz)) {
        const defaultCurrAns = shuffleArray(
          currentQuiz.correctAnswer
            .map((item, index) => {
              return [
                [item[0], `droppable-${index}`],
                ["", item[1]],
              ];
            })
            .flat()
        );
        changeCurrentAnswer(currentQuiz.id, defaultCurrAns);
      } else if (isReOrderQuizField(currentQuiz)) {
        let firstArr = currentQuiz.correctAnswer.map(
          (item: string[], index) => {
            return [item[0], `droppable-${index}`];
          }
        );
        firstArr = shuffleArray(firstArr);
        const secondArr = currentQuiz.correctAnswer.map(
          (item: string[], index) => {
            return ["", item[1]];
          }
        );
        changeCurrentAnswer(currentQuiz.id, [...firstArr, ...secondArr]);
      } else {
        changeCurrentAnswer(currentQuiz.id, "");
      }
    }
  }, [currentQuizIndex]);

  function handleNext() {
    if (currentQuizIndex === quizFields.length - 1) return;
    //
    setCurrentQuizIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (currentQuizIndex === 0) return;
    //
    setCurrentQuizIndex((prev) => prev - 1);
  }

  return (
    <div>
      {isLastQuiz && <Link href={"/result"}>Finish</Link>}
      {/* QUIZES */}
      {renderQuiz(currentQuiz)}
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

//can use a mapping dict for further refactoring
function renderQuiz(currentQuiz: QuizField) {
  if (isTextQuizField(currentQuiz)) {
    return <TextQuiz quizField={currentQuiz} />;
  } else if (isSelectQuizField(currentQuiz)) {
    return <MultipleChoiceQuiz quizField={currentQuiz} />;
  } else if (isFillInBlankQuizField(currentQuiz)) {
    return <FillInBlankQuiz quizField={currentQuiz} />;
  } else if (isMatchQuizField(currentQuiz) || isReOrderQuizField(currentQuiz)) {
    return <MatchQuiz quizField={currentQuiz} />;
  }
  // else if (isReOrderQuizField(currentQuiz)) {
  //   return <MatchQuiz quizField={currentQuiz} />;
  // }
}
