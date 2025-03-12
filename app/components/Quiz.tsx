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
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      {/* Quiz Content Area */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Quiz Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                Question {currentQuizIndex + 1} of {quizFields.length}
              </h2>
              {isLastQuiz && (
                <Link href="/result">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
                    Finish Quiz
                  </button>
                </Link>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((currentQuizIndex + 1) / quizFields.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="mb-8">{renderQuiz(currentQuiz)}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentQuizIndex > 0 ? (
              <button
                onClick={handlePrev}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentQuizIndex < quizFields.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
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
