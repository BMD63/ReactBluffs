export type BooleanQuestionAnswer = {
  answer: boolean;
  bonus: boolean;
};

export type MultipleChoiceQuestionAnswer = {
  answer: string;
};

export type OpenQuestionAnswer = {
  answer: string;
};

export type QuestionAnswer =
  | BooleanQuestionAnswer
  | MultipleChoiceQuestionAnswer
  | OpenQuestionAnswer;