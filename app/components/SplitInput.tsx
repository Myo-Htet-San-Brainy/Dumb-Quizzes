import React, { useRef } from "react";

const SplitInput = ({
  currentAnswer,
  changeCurrentAnswer,
}: {
  currentAnswer?: any[];
  changeCurrentAnswer: (newValue: any[]) => void;
}) => {
  const inputsRef = useRef<any[]>([]);

  function handleCharChange(e: any, i: number) {
    let value = e.target.value;
    value = value[value.length - 1] || "";
    //update chars
    const newAnswer = [...(currentAnswer as any[])];
    newAnswer[i] = value;
    changeCurrentAnswer(newAnswer);
    //move focus to next adjacent input if there's any
    if (i !== (currentAnswer?.length as number) - 1) {
      inputsRef.current[i + 1].focus();
    }
  }

  function handleKeydown(e: any, i: number) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (i === 0 && currentAnswer?.[i]) {
        const newAnswer = [...(currentAnswer as any[])];
        newAnswer[i] = "";
        changeCurrentAnswer(newAnswer);
        inputsRef.current[i].focus();
        return;
      }
      if (i > 0) {
        if (currentAnswer?.[i]) {
          const newAnswer = [...currentAnswer];
          newAnswer[i] = "";
          changeCurrentAnswer(newAnswer);
          inputsRef.current[i].focus();
        } else {
          const newAnswer = [...(currentAnswer as any[])];
          newAnswer[i - 1] = "";
          changeCurrentAnswer(newAnswer);
          inputsRef.current[i - 1].focus();
        }
      }
    }
  }

  return (
    <div className="flex gap-1">
      {currentAnswer?.map((char: any, i: number) => (
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
  );
};

export default SplitInput;
