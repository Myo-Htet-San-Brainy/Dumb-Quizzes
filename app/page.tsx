import React, { useState } from "react";
import JoinQuiz from "./components/JoinQuiz";
import Link from "next/link";

const Home = () => {
  const featuredQuizzes = [
    { id: 1, title: "Basic Science Quiz", questions: 15 },
    { id: 2, title: "World History Trivia", questions: 20 },
    { id: 3, title: "Tech Innovations", questions: 10 },
    { id: 4, title: "Literary Masterpieces", questions: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
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

            <Link
              href={"https://form-builder-gules-ten.vercel.app/"}
              target="_blank"
              className="px-4 py-2 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Create Quiz
            </Link>
          </div>
        </div>
      </header>

      {/* Join Quiz Section */}
      <JoinQuiz />
      {/* Featured Quizzes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Featured Quizzes</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold p-4 text-center">
                    {quiz.title}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">
                      {quiz.questions} questions
                    </span>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition">
                    Take Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                1,500+
              </div>
              <div className="text-gray-600">Available Quizzes</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-2">25+</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-xl py-10 px-6 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Create Your Own Quiz</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Share your knowledge with others by creating custom quizzes on any
              topic you're passionate about.
            </p>
            <Link
              href={"https://form-builder-gules-ten.vercel.app/"}
              target="_blank"
              className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Create Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">QuizMaster</h4>
              <p>
                Join quizzes with ID or link, or create your own to share with
                others.
              </p>
            </div>
            <div className="md:text-right">
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Create Quiz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Featured Quizzes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; 2025 QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
