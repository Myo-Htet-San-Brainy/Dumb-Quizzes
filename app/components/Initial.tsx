import React from "react";
import { quiz } from "../lib/static";
import { useStore } from "../lib/globalState";

const Initial = ({
  changeQuizStart,
}: {
  changeQuizStart: (startState: boolean) => void;
}) => {
  const { title } = useStore();
  return (
    <div className="h-screen bg-fuchsia-400 flex items-center justify-center gap-2">
      <h1>{title}</h1>
      <button
        className="text-xl bg-gray-300 rounded-md"
        onClick={() => changeQuizStart(true)}
      >
        start quiz
      </button>
    </div>
  );
};

export default Initial;
