export interface NodeData {
  id: string;
  parentId: string;
  name: string;
  linkStyle: string;
}

export interface BaseQuizField {
  id: string;
  question: string;
  correctAnswer: string;
}

export interface TextQuizField extends BaseQuizField {
  type: "text";
}

export function isTextQuizField(
  quizField: QuizField
): quizField is TextQuizField {
  return quizField.type === "text";
}

export interface Option {
  id: string;
  value: string;
}

export interface SelectQuizField extends BaseQuizField {
  type: "multipleChoice";
  options: Option[];
}

export function isSelectQuizField(
  quizField: QuizField
): quizField is SelectQuizField {
  return quizField.type === "multipleChoice";
}

export interface Quiz {
  title: string;
  quizFields: QuizField[];
}

export type QuizField = TextQuizField | SelectQuizField;
