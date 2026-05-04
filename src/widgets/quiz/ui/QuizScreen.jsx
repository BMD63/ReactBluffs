import { SCREEN } from '@/entities/quiz-session/model/quizUISlice';

import Menu from '@/widgets/quiz/ui/menu/Menu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';

const QuizScreen = ({
  screen,
  card,
  answers,
  index,
  total,
  currentCardScore,
  totalScore,
  onAnswer,
  onBonus,
  onSubmit,
  onRestart,
  onRulesClose,
  onNextCard,
  onGoToMenu,
}) => {
  switch (screen) {
    case SCREEN.MENU:
      return <Menu />;

    case SCREEN.SETTINGS:
      return <Settings />;

    case SCREEN.GAME:
      return card?.length > 0 ? (
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
      ) : null;

    case SCREEN.RULES:
      return (
        <RulesModal
          isOpen
          onClose={onRulesClose}
        />
      );

    case SCREEN.CARD_RESULT:
      return (
        <CardResultsModal
          isOpen
          cardData={card}
          cardIndex={index}
          score={currentCardScore}
          onNext={onNextCard}
          isLastCard={index === total - 1}
          userAnswers={answers}
          onRestart={onRestart}
          onMenu={onGoToMenu}
        />
      );

    case SCREEN.FINAL:
      return (
        <FinalResultsModal
          isOpen
          totalScore={totalScore}
          onRestart={onRestart}
          onMenu={onGoToMenu}
        />
      );

    default:
      return null;
  }
};

export default QuizScreen;