"use client";

import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Initial from "./components/Initial";
import { OrgChartComponent } from "./components/OrgChart";
import { data } from "./lib/static";

const Home = () => {
  const [isStart, setIsStart] = useState(false);

  function changeQuizStart(startState: boolean) {
    setIsStart(startState);
  }

  return (
    <div>
      {isStart ? <Quiz /> : <Initial changeQuizStart={changeQuizStart} />}
      {/* <OrgChartComponent data={data} /> */}
    </div>
  );
};

export default Home;
