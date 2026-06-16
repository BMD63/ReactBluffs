export type FieldErrors = Record<string, string>;

export type AdminQuestionType =
  | 'openText'
  | 'boolean'
  | 'multipleChoice'
  | 'image'
  | 'audio';

export type AdminQuestion = {
  id: string;
  type: AdminQuestionType;
  gameMode: 'bluff' | 'multipleChoice' | 'openAnswer';
  text: string;
  correctAnswer?: boolean | string;
  answer?: string;
  aliases?: string[];
  options?: string[];
  media?: {
    type: 'image' | 'audio';
    url: string;
    alt?: string;
  };
};

export type QuestionFormValues = {
  questionText: string;
  answer: string;
  aliases: string;
  booleanAnswer: string;
  option1: string;
  option2: string;
  option3: string;
  multipleChoiceAnswer: string;
  mediaUrl: string;
  mediaAlt: string;
};
