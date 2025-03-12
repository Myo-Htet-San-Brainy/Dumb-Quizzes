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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.5 16.5v-9l7 4.5-7 4.5z" />
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            </svg>
            <h1 className="text-2xl font-bold">QuizMaster</h1>
          </div>
        </div>
      </header>

      {/* Quiz Join Confirmation */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-12 w-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Quiz icon - stylized Q */}
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>

          <button
            onClick={() => changeQuizStart(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mb-6"
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Initial;
