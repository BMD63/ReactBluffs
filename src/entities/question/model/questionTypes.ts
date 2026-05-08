export type BooleanQuestion = {
  id: string;
  type: 'boolean';
  text: string;
  correctAnswer: boolean;
};

export type MultipleChoiceQuestion = {
  id: string;
  type: 'multipleChoice';
  text: string;
  options: string[];
  correctAnswer: string;
};

export type OpenTextQuestion = {
  id: string;
  type: 'openText';
  text: string;
  correctAnswer: string;
};

export type ImageQuestion = {
  id: string;
  type: 'image';
  imageUrl: string;
  text: string;
  correctAnswer: string;
};

export type AudioQuestion = {
  id: string;
  type: 'audio';
  audioUrl: string;
  text: string;
  correctAnswer: string;
};

export type Question =
  | BooleanQuestion
  | MultipleChoiceQuestion
  | OpenTextQuestion
  | ImageQuestion
  | AudioQuestion;