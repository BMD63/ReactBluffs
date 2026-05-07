import { SCREEN } from '@/entities/quiz-session';

import Menu from '@/widgets/quiz/ui/menu/Menu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import { PlayQuiz } from '@/features/play-quiz';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';

const QuizScreen = ({
  screen,
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  totalCards,
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
        return (
          <PlayQuiz
            currentCard={currentCard}
            currentCardAnswers={currentCardAnswers}
            currentCardIndex={currentCardIndex}
            totalCards={totalCards}
            onAnswer={onAnswer}
            onBonus={onBonus}
            onSubmit={onSubmit}
            onRestart={onRestart}
          />
        );

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
          cardData={currentCard}
          cardIndex={currentCardIndex}
          score={currentCardScore}
          onNext={onNextCard}
          isLastCard={currentCardIndex === totalCards - 1}
          userAnswers={currentCardAnswers}
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