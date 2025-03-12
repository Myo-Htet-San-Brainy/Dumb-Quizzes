"use client";

import React, { useEffect, useState } from "react";

import Quiz from "../../components/Quiz";
import Initial from "../../components/Initial";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useStore } from "@/app/lib/globalState";
import { Loading } from "@/app/components/Loading";
import { ErrorComponent } from "@/app/components/Error";

const Home = () => {
  const [isStart, setIsStart] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const { quizId } = useParams<{ quizId: string }>();
  const router = useRouter();
  const { setQuiz } = useStore();
  //no quizId, maybe error

  useEffect(() => {
    async function fetchQuiz() {
      //fetch quiz data > toast > navigate to home
      setIsFetching(true);
      const res = await fetch(`http://localhost:3001/api/${quizId}`);
      setIsFetching(false);
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
    try {
      fetchQuiz();
    } catch (error) {
      setIsFetching(false);
      setIsError(true);
    }
  }, []);

  function changeQuizStart(startState: boolean) {
    setIsStart(startState);
  }

  if (isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <div>
      {isStart ? <Quiz /> : <Initial changeQuizStart={changeQuizStart} />}
    </div>
  );
};

export default Home;
