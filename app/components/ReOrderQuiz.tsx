import React from "react";
import { ReOrderQuizField } from "../lib/entities";
import Draggable from "./Draggable";
import { useStore } from "../lib/globalState";

interface ReOrderQuizProps {
  quizField: ReOrderQuizField;
}

const ReOrderQuiz: React.FC<ReOrderQuizProps> = ({ quizField }) => {
  const { changeCurrentAnswer: handleCurrentAnsChange } = useStore();

  function changeCurrentAnswer(newValue: any[]) {
    handleCurrentAnsChange(quizField.id, newValue);
  }
  const dynamicDroppableStyle = {
    width: `${100 / ((quizField.currentAnswer?.length as number) / 2)}%`,
  };
  const topRowItems = quizField.currentAnswer?.map((item) => {
    if (item[1].startsWith("droppable-")) {
      if (item[0] === "") {
        return (
          <div
            key={item[1]}
            className="grow h-28 p-2 bg-sky-200 "
            data-is-dropzone="true"
            id={item[1]}
            style={dynamicDroppableStyle}
          />
        );
      } else {
        return (
          <div
            key={item[1]}
            className={` h-28 p-2 bg-sky-200 `}
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
              {item[0]}
            </Draggable>
          </div>
        );
      }
    }
  });
  return <div>ReOrder</div>;
};

export default ReOrderQuiz;
