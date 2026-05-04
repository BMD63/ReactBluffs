import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';

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
  if (!card?.length) return null;

  return (
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
  );
};

export default PlayQuiz;