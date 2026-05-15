import type { Question } from '@/entities/question/model/questionTypes';
import {
  type MultipleChoiceQuestion,
} from '@/entities/question/model/questionTypes';
import type {
  OpenTextQuestion,
} from '@/entities/question/model/questionTypes';

import OpenAnswerQuizCard from './OpenAnswerQuizCard';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import BooleanQuizCard from './BooleanQuizCard';
import MultipleChoiceQuizCard from './MultipleChoiceQuizCard';

type QuizCardProps = {
  cardData: Question[];
  cardIndex: number;
  userAnswers: CardAnswers;
  totalCards: number;

  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: boolean | string
  ) => void;

  onBonus: (
    cardIndex: number,
    questionId: string
  ) => void;

  onSubmit: () => void;
  onRestart: () => void;
  onMenu: () => void;
};

const QuizCard = (props: QuizCardProps) => {
  const firstQuestion = props.cardData[0];

  if (!firstQuestion) {
    return null;
  }

  switch (firstQuestion.gameMode) {
    case 'bluff':
      return (
        <BooleanQuizCard {...props} />
      );
    case 'multipleChoice':
      return (
        <MultipleChoiceQuizCard
          {...props}
          cardData={props.cardData as MultipleChoiceQuestion[]}
        />
      );
    case 'openAnswer':
      return (
        <OpenAnswerQuizCard
          {...props}
          cardData={props.cardData as OpenTextQuestion[]}
        />
      );
    default:
      return null;
  }
};

export default QuizCard;