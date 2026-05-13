import { SCREEN } from '@/entities/quiz-session';
import type { Screen } from '@/entities/quiz-session/model/config/screen';
import type { BooleanQuestion } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';
import type { GameMode } from '@/entities/game-mode';

import BluffMenu from '@/widgets/quiz/ui/menus/bluff-menu/BluffMenu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import StartScreen from '@/widgets/quiz/ui/screens/start/StartScreen';
import ModeSelectionScreen from '@/widgets/quiz/ui/screens/mode-selection/ModeSelectionScreen';

import { PlayQuiz } from '@/features/play-quiz';

type QuizScreenProps = {
  screen: Screen;

  currentCard: BooleanQuestion[]|undefined;
  currentCardAnswers: CardAnswers;
  currentCardIndex: number;
  totalCards: number;
  onStart: () => void;
  currentCardScore: number;
  totalScore: number;

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
  onRulesClose: () => void;
  onNextCard: () => void;
  onGoToMenu: () => void;
  onBackToStart: () => void;

  onSelectMode: (mode: GameMode) => void;
};

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
  onStart,
  onSelectMode,
  onBackToStart,
}: QuizScreenProps) => {
  switch (screen) {
    case SCREEN.START:
      return (
        <StartScreen
          onStart={onStart}
        />
      );

    case SCREEN.MODE_SELECTION:
      return (
        <ModeSelectionScreen
          onSelectMode={onSelectMode}
          onBack={onBackToStart}
        />
      );  

    case SCREEN.BLUFF_MENU:
      return <BluffMenu />;

    case SCREEN.SETTINGS:
      return <Settings />;

    case SCREEN.GAME:
      if (!currentCard) return null;
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
          onMenu={onGoToMenu}
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
      if (!currentCard) return null;
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