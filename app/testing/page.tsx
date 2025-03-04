import React from "react";
import Draggable from "../components/Draggable";

const Testing = () => {
  return (
    <div>
      <div>
        <h1>title</h1>
        <div className="relative">
          <h1 className="z-10 absolute bg-red-500  ">hello</h1>
        </div>
      </div>
      <div className="relative bg-green-500">
        <h1>bottle</h1>
      </div>
    </div>
  );
};

export default Testing;
