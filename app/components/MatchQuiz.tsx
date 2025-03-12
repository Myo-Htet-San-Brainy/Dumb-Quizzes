import React from "react";
import { quiz } from "../lib/static";
import { MatchQuizField, ReOrderQuizField } from "../lib/entities";
import Draggable from "./Draggable";
import { useStore } from "../lib/globalState";

interface MatchQuizProps {
  quizField: MatchQuizField | ReOrderQuizField;
}

const MatchQuiz: React.FC<MatchQuizProps> = ({ quizField }) => {
  const { changeCurrentAnswer: handleCurrentAnsChange } = useStore();
  function changeCurrentAnswer(newValue: any[]) {
    handleCurrentAnsChange(quizField.id, newValue);
  }
  const dynamicDroppableStyle = {
    width: `${100 / ((quizField.currentAnswer?.length as number) / 2)}%`,
  };
  return (
    <div className="space-y-4">
      <h1>{quizField.question}</h1>
      {/* filler droppable fields, */}
      <div className="flex gap-5">
        {quizField.currentAnswer?.map((item: any, i: number) => {
          if (item[1].startsWith("droppable-")) {
            if (item[0] === "") {
              return (
                <div
                  key={item[1]}
                  className="grow h-28 p-2 bg-gray-200 rounded-md"
                  data-is-dropzone="true"
                  id={item[1]}
                  style={dynamicDroppableStyle}
                />
              );
            } else {
              return (
                <div
                  key={item[1]}
                  className={` h-28 p-2 bg-gray-200 rounded-md`}
                  data-is-dropzone="true"
                  id={item[1]}
                  style={dynamicDroppableStyle}
                >
                  <Draggable
                    draggableId={item[0]}
                    changeCurrentAnswer={changeCurrentAnswer}
                    currentAnswer={quizField.currentAnswer}
                    currentDropZoneId={item[1]}
                  >
                    <div className="h-full flex items-center justify-center text-white">
                      {item[0]}
                    </div>
                  </Draggable>
                </div>
              );
            }
          }
        })}
      </div>
      {/* droppable fields */}
      <div className="flex gap-5">
        {quizField.currentAnswer?.map((item: any, i: number) => {
          if (!item[1].startsWith("droppable-")) {
            if (item[0] === "") {
              return (
                <div
                  key={item[1]}
                  className="grow h-28 p-2 bg-gray-200 rounded-md text-center"
                  data-is-dropzone="true"
                  id={item[1]}
                  style={dynamicDroppableStyle}
                >
                  {item[1]}
                </div>
              );
            } else {
              return (
                <div
                  key={item[1]}
                  className="grow h-28 p-2 bg-gray-200 flex flex-col rounded-md text-center"
                  data-is-dropzone="true"
                  id={item[1]}
                  style={dynamicDroppableStyle}
                >
                  <h1>{item[1]}</h1>
                  <Draggable
                    draggableId={item[0]}
                    changeCurrentAnswer={changeCurrentAnswer}
                    currentAnswer={quizField.currentAnswer}
                    currentDropZoneId={item[1]}
                  >
                    <div className="h-full flex items-center justify-center text-white">
                      {item[0]}
                    </div>
                  </Draggable>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default MatchQuiz;
