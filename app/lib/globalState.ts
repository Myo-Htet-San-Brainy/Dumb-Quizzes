import { create } from "zustand";
import { Quiz } from "./entities";
import { quiz } from "./static";

interface StoreState extends Quiz {
  changeCurrentAnswer: (quizId: string, value: any) => void;
  setQuiz: (quiz: Quiz) => void;
}

export const useStore = create<StoreState>((set) => ({
  ...quiz,
  setQuiz: (quiz) => {
    set((prev) => {
      return {
        ...prev,
        quizFields: quiz.quizFields,
        title: quiz.title,
      };
    });
  },
  changeCurrentAnswer: (quizId: string, value: any) => {
    set((prev) => {
      const updatedQuizFields = prev.quizFields.map((quizField) => {
        if (quizField.id === quizId) {
          return { ...quizField, currentAnswer: value };
        }
        return quizField;
      });
      return {
        ...prev,
        quizFields: updatedQuizFields,
      };
    });
  },
}));
