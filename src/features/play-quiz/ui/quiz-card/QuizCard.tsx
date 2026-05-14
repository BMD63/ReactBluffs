import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import BooleanQuizCard from './BooleanQuizCard';

type QuizCardProps = {
  cardData: Question[];
  cardIndex: number;
  userAnswers: CardAnswers;
  totalCards: number;

  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: boolean
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

    default:
      return null;
  }
};

export default QuizCard;