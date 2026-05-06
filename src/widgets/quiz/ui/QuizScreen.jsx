import { SCREEN } from '@/entities/quiz-session/model/quizUISlice';

import Menu from '@/widgets/quiz/ui/menu/Menu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import { PlayQuiz } from '@/features/play-quiz';
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
        return (
            <PlayQuiz
            card={card}
            answers={answers}
            index={index}
            total={total}
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