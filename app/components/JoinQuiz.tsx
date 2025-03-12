"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const JoinQuiz = () => {
  const [input, setInput] = useState("");

  const router = useRouter();

  function handleJoin() {
    const isPlainCode = !input.startsWith("http");
    //validation here

    if (isPlainCode) {
      router.push(`/play/${input}`);
    } else {
      router.push(input);
    }
  }

  return (
    <div className="bg-indigo-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join a Quiz</h2>
          <p className="text-xl mb-6">
            Enter a quiz ID or paste a quiz link to start
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Enter quiz ID or link"
              className="px-4 py-3 rounded-lg w-full md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleJoin}
              className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Join Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
