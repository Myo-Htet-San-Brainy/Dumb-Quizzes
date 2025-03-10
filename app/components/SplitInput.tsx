import React, { useRef } from "react";

const SplitInput = ({
  currentAnswer,
  changeCurrentAnswer,
}: {
  currentAnswer?: any[];
  changeCurrentAnswer: (newValue: any[]) => void;
}) => {
  const inputsRef = useRef<any[]>([]);
  let nonSpaceIdsCounter = -1;
  const proxyAnswer = currentAnswer?.filter((char) => char !== " ");
  const spaceCharPos = currentAnswer
    ?.map((char, i) => (char === " " ? i : null))
    .filter((item) => item !== null);
  // console.log(proxyAnswer);
  // console.log(spaceCharPos);

  function handleCharChange(e: any, i: number) {
    console.log("calling handleCharChange, given index", i);
    e.preventDefault();
    let value = e.target.value;
    console.log("changed value:", value);

    value = value.trim()[0];
    //update chars
    let newAnswer = [...(proxyAnswer as any[])];
    newAnswer[i] = value;
    spaceCharPos?.map((pos) => {
      newAnswer.splice(pos, 0, " ");
    });
    changeCurrentAnswer(newAnswer);
    //move focus to next adjacent input if there's any
    if (i !== (proxyAnswer?.length as number) - 1) {
      inputsRef.current[i + 1].focus();
    }
  }

  function handleKeydown(e: any, i: number) {
    console.log("calling handleKeydown, given index", i);

    if (e.key === "Backspace") {
      console.log("inside Backspace");
      e.preventDefault();
      if (i === 0 && proxyAnswer?.[i]) {
        let newAnswer = [...proxyAnswer];
        newAnswer[i] = "";
        spaceCharPos?.map((pos) => {
          newAnswer.splice(pos, 0, " ");
        });
        changeCurrentAnswer(newAnswer);
        inputsRef.current[i].focus();
        return;
      }
      if (i > 0) {
        if (proxyAnswer?.[i]) {
          let newAnswer = [...proxyAnswer];
          newAnswer[i] = "";
          spaceCharPos?.map((pos) => {
            newAnswer.splice(pos, 0, " ");
          });
          changeCurrentAnswer(newAnswer);
          inputsRef.current[i].focus();
        } else {
          let newAnswer = [...(proxyAnswer as any[])];
          newAnswer[i - 1] = "";
          // console.log('proxyAnswer')
          // console.log("new answer", newAnswer);
          spaceCharPos?.map((pos) => {
            newAnswer.splice(pos, 0, " ");
          });
          // console.log("new answer with spaces", newAnswer);

          changeCurrentAnswer(newAnswer);
          inputsRef.current[i - 1].focus();
        }
      }
    }
  }
  // console.log("nonSpaceIdsCounter", nonSpaceIdsCounter);
  return (
    <div className=" flex gap-1">
      {currentAnswer?.map((char: any, i: number) => {
        if (char !== " ") {
          nonSpaceIdsCounter += 1;
          const temp = nonSpaceIdsCounter;
          // console.log(
          //   "nonSpaceIdsCounter before assigning",
          //   nonSpaceIdsCounter
          // );
          return (
            <input
              ref={(el) => {
                inputsRef.current[temp] = el;
              }}
              key={i}
              className="border border-black w-5 h-5"
              value={proxyAnswer?.[temp] || ""}
              onKeyDown={(e) => handleKeydown(e, temp)}
              onChange={(e) => handleCharChange(e, temp)}
            />
          );
        } else {
          return <div key={i} className="w-5"></div>;
        }
      })}
    </div>
  );
};

export default SplitInput;
