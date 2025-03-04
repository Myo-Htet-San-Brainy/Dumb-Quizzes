"use client";

import React, { useEffect, useState } from "react";

import Quiz from "../../components/Quiz";
import Initial from "../../components/Initial";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useStore } from "@/app/lib/globalState";

const Home = () => {
  const [isStart, setIsStart] = useState(false);
  const { quizId } = useParams<{ quizId: string }>();
  const router = useRouter();
  const { setQuiz } = useStore();
  //no quizId, maybe error

  useEffect(() => {
    async function fetchQuiz() {
      //fetch quiz data > toast > navigate to home
      const res = await fetch(`http://localhost:3001/api/${quizId}`);
      const jsonRes = await res.json();
      if (res.status !== 200) {
        toast(jsonRes.error);
        router.push("/");
        return;
      }
      //update state
      setQuiz({
        quizFields: jsonRes.data.quizFields,
        title: jsonRes.data.title,
      });
    }
    fetchQuiz();
  }, []);

  function changeQuizStart(startState: boolean) {
    setIsStart(startState);
  }

  return (
    <div>
      {isStart ? <Quiz /> : <Initial changeQuizStart={changeQuizStart} />}
    </div>
  );
};

export default Home;
