export interface NodeData {
  id: string;
  parentId: string;
  name: string;
  linkStyle: string;
}

export interface BaseQuizField {
  id: string;
  question: string;
}

export interface MatchQuizField extends BaseQuizField {
  type: "match";
  correctAnswer: string[][]; //[['milk', 'from cow'], ['water', 'from earth']]
  currentAnswer?: string[][]; //[['milk', 'droppable-1'], ['water', 'droppable-2'], ['', 'from cow'], ['', 'from earth']]
}

export function isMatchQuizField(
  quizField: QuizField
): quizField is MatchQuizField {
  return quizField.type === "match";
}

export interface TextQuizField extends BaseQuizField {
  type: "text";
  correctAnswer: string;
  currentAnswer?: string;
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
  correctAnswer: string;
  currentAnswer?: string;
}

export function isSelectQuizField(
  quizField: QuizField
): quizField is SelectQuizField {
  return quizField.type === "multipleChoice";
}

export interface FillInBlankQuizField extends BaseQuizField {
  type: "fillInBlank";
  correctAnswer: string;
  currentAnswer?: string[];
}

export function isFillInBlankQuizField(
  quizField: QuizField
): quizField is FillInBlankQuizField {
  return quizField.type === "fillInBlank";
}

export interface ReOrderQuizField extends BaseQuizField {
  type: "reOrder";
  correctAnswer: any[];
  currentAnswer?: any[];
}

export function isReOrderQuizField(
  quizField: QuizField
): quizField is ReOrderQuizField {
  return quizField.type === "reOrder";
}

export interface Quiz {
  title: string;
  quizFields: QuizField[];
}

export type QuizField =
  | TextQuizField
  | SelectQuizField
  | FillInBlankQuizField
  | MatchQuizField
  | ReOrderQuizField;

export interface FillInBlankQuizFieldResult extends FillInBlankQuizField {
  status: boolean;
}

export interface TextQuizFieldResult extends TextQuizField {
  status: boolean;
}

export interface SelectQuizFieldResult extends SelectQuizField {
  status: boolean;
}

export interface MatchQuizFieldResult extends MatchQuizField {
  status: boolean;
}

export type QuizResult =
  | FillInBlankQuizField
  | TextQuizFieldResult
  | SelectQuizFieldResult
  | MatchQuizFieldResult;
