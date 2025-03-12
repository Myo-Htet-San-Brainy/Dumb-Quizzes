import { Quiz } from "./entities";
import { v4 as uuidv4 } from "uuid";

export const data = [
  {
    id: "1",
    parentId: "",
    name: "CEO",
    linkStyle: "normal",
  },
  {
    id: "2",
    parentId: "1",
    name: "CTO",
    linkStyle: "normal",
  },
  {
    id: "3",
    parentId: "1",
    name: "CFO",
    linkStyle: "dashed",
  },
  {
    id: "4",
    parentId: "1",
    name: "New Node",
    linkStyle: "normal",
  },
  {
    id: "5",
    parentId: "1",
    name: "New Node",
    linkStyle: "normal",
  },
  {
    id: "6",
    parentId: "1",
    name: "New Node",
    linkStyle: "normal",
  },
  {
    id: "7",
    parentId: "1",
    name: "New Node",
    linkStyle: "normal",
  },
  {
    id: "8",
    parentId: "1",
    name: "New Node",
    linkStyle: "normal",
  },
];

export const quiz: Quiz = {
  title: "Some title",
  quizFields: [
    {
      id: uuidv4(),
      question: "q 1",
      type: "text",
      correctAnswer: "correct answer",
      currentAnswer: "correct answer",
    },
  ],
};
