import { useEffect, useState } from 'react';
import Card from '@/features/play-quiz/ui/quiz-card/QuizCard';

const PlayQuiz = ({
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  totalCards,
  onAnswer,
  onBonus,
  onSubmit,
  onRestart,
}) => {
    const [transitionStage, setTransitionStage] = useState('enter');
    useEffect(() => {
        setTransitionStage('exit');

        const timeout = setTimeout(() => {
            setTransitionStage('enter');
        }, 140);

  return () => clearTimeout(timeout);
}, [currentCardIndex]);
  if (!currentCard?.length) return null;

  return (
    <div className={`quiz-card-transition quiz-card-transition--${transitionStage}`} key={currentCardIndex}>
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