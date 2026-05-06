import { useEffect, useState } from 'react';
import Card from '@/features/play-quiz/ui/quiz-card/QuizCard';

const PlayQuiz = ({
  card,
  answers,
  index,
  total,
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
}, [index]);
  if (!card?.length) return null;

  return (
    <div className={`quiz-card-transition quiz-card-transition--${transitionStage}`} key={index}>
    <Card
      cardData={card}
      cardIndex={index}
      userAnswers={answers}
      onAnswer={onAnswer}
      onBonus={onBonus}
      onSubmit={onSubmit}
      onRestart={onRestart}
      totalCards={total}
    />
  </div>
  );
};

export default PlayQuiz;