import { useEffect, useState } from 'react';

import type { BooleanQuestion } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import Card from '@/features/play-quiz/ui/quiz-card/QuizCard';

type PlayQuizProps = {
  currentCard: BooleanQuestion[];
  currentCardAnswers: CardAnswers;
  currentCardIndex: number;
  totalCards: number;
  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: boolean
  ) => void;
  onBonus: (cardIndex: number, questionId: string) => void;
  onSubmit: () => void;
  onRestart: () => void;
};

const PlayQuiz = ({
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  totalCards,
  onAnswer,
  onBonus,
  onSubmit,
  onRestart,
}: PlayQuizProps) => {
  const [transitionStage, setTransitionStage] =
    useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    setTransitionStage('exit');

    const timeout = setTimeout(() => {
      setTransitionStage('enter');
    }, 140);

    return () => clearTimeout(timeout);
  }, [currentCardIndex]);

  if (!currentCard?.length) return null;

  return (
    <div
      className={`quiz-card-transition quiz-card-transition--${transitionStage}`}
      key={currentCardIndex}
    >
      <Card
        cardData={currentCard}
        cardIndex={currentCardIndex}
        userAnswers={currentCardAnswers}
        onAnswer={onAnswer}
        onBonus={onBonus}
        onSubmit={onSubmit}
        onRestart={onRestart}
        totalCards={totalCards}
      />
    </div>
  );
};

export default PlayQuiz;