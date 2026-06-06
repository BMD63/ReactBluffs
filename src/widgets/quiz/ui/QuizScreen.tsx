import { SCREEN } from '@/entities/quiz-session';
import type { Screen } from '@/entities/quiz-session/model/config/screen';
import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';
import type { GameMode } from '@/entities/game-mode';

import GameModeMenu from '@/widgets/quiz/ui/menus/game-mode-menu/GameModeMenu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import StartScreen from '@/widgets/quiz/ui/screens/start/StartScreen';
import ModeSelectionScreen from '@/widgets/quiz/ui/screens/mode-selection/ModeSelectionScreen';
import type { GameFlowMode } from '@/entities/game-flow';
import GameFlowSelectionScreen from '@/widgets/quiz/ui/screens/game-flow-selection/GameFlowSelectionScreen';
import type { TournamentConfig } from '@/entities/tournament-config';
import TournamentIntroScreen from '@/widgets/quiz/ui/screens/tournament-intro/TournamentIntroScreen';
import RoundIntroScreen from '@/widgets/quiz/ui/screens/round-intro/RoundIntroScreen';
import TournamentQuestionScreen from '@/widgets/quiz/ui/screens/tournament-question/TournamentQuestionScreen';
import RoundAnswerSheetScreen from '@/widgets/quiz/ui/screens/round-answer-sheet/RoundAnswerSheetScreen';
import RoundResultsScreen from '@/widgets/quiz/ui/screens/round-results/RoundResultsScreen';
import TournamentResultsScreen from '@/widgets/quiz/ui/screens/tournament-results/TournamentResultsScreen';

import { PlayQuiz } from '@/features/play-quiz';

type QuizScreenProps = {
  screen: Screen;
  gameMode: GameMode;
  currentCard: Question[] | undefined;
  currentCardAnswers: CardAnswers;
  currentCardIndex: number;
  currentTournamentRoundIndex: number;
  totalCards: number;
  onStart: () => void;
  currentCardScore: number;
  totalScore: number;
  activeTournamentConfig: TournamentConfig | null;
  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: boolean | string
  ) => void;

  onBonus: (cardIndex: number, questionId: string) => void;
  onRulesOpen: () => void;
  onStartRound: () => void;
  onRestartTournament: () => void;
  onSubmit: () => void;
  onRestart: () => void;
  onRulesClose: () => void;
  onNextCard: () => void;
  onGoToMenu: () => void;
  onBackToStart: () => void;
  onBackToGameFlowSelection: () => void;
  onSelectMode: (mode: GameMode) => void;
  onSelectGameFlowMode: (mode: GameFlowMode) => void;
  onStartTournament: () => void;
  onAnswerTournamentQuestion: () => void;
  onFinishRound: () => void;
  onNextRound: () => void;

  currentTournamentQuestionIndex: number;
};

const QuizScreen = ({
  screen,
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  currentTournamentRoundIndex,
  totalCards,
  currentCardScore,
  totalScore,
  gameMode,
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
  onSelectGameFlowMode,
  onBackToGameFlowSelection,
  activeTournamentConfig,
  onStartTournament,
  onRulesOpen,
  onStartRound,
  onRestartTournament,
  onAnswerTournamentQuestion,
  onFinishRound,
  onNextRound,
  currentTournamentQuestionIndex,
}: QuizScreenProps) => {
  switch (screen) {
    case SCREEN.START:
      return <StartScreen onStart={onStart} />;

    case SCREEN.GAME_FLOW_SELECTION:
      return (
        <GameFlowSelectionScreen
          onSelectGameFlowMode={onSelectGameFlowMode}
          onBack={onBackToStart}
        />
      );

    case SCREEN.TOURNAMENT_INTRO:
      if (!activeTournamentConfig) {
        return null;
      }

      return (
        <TournamentIntroScreen
          title={activeTournamentConfig.title}
          roundsCount={activeTournamentConfig.rounds.length}
          firstRoundTitle={activeTournamentConfig.rounds[0]?.title ?? '—'}
          onBack={onBackToGameFlowSelection}
          onStartTournament={onStartTournament}
        />
      );

    case SCREEN.ROUND_INTRO: {
      const currentRound =
        activeTournamentConfig?.rounds[currentTournamentRoundIndex];

      if (!activeTournamentConfig || !currentRound) {
        return null;
      }

      return (
        <RoundIntroScreen
          roundNumber={currentTournamentRoundIndex + 1}
          totalRounds={activeTournamentConfig.rounds.length}
          title={currentRound.title}
          questionsCount={currentRound.questionsCount}
          questionTimeSeconds={currentRound.questionTimeSeconds}
          correctionTimeSeconds={currentRound.correctionTimeSeconds}
          difficulty={currentRound.difficulty}
          type={currentRound.type}
          onRules={onRulesOpen}
          onStartRound={onStartRound}
          onExit={onBackToStart}
          onRestart={onRestartTournament}
        />
      );
    }

    case SCREEN.TOURNAMENT_QUESTION: {
      const currentRound =
        activeTournamentConfig?.rounds[currentTournamentRoundIndex];

      if (!activeTournamentConfig || !currentRound) {
        return null;
      }

      return (
        <TournamentQuestionScreen
          roundNumber={currentTournamentRoundIndex + 1}
          totalRounds={activeTournamentConfig.rounds.length}
          questionNumber={currentTournamentQuestionIndex + 1}
          totalQuestions={currentRound.questionsCount}
          onExit={onBackToStart}
          onRestart={onRestartTournament}
          onAnswer={onAnswerTournamentQuestion}
        />
      );
    }
    case SCREEN.ROUND_ANSWER_SHEET: {
      const currentRound =
        activeTournamentConfig?.rounds[currentTournamentRoundIndex];

      if (!activeTournamentConfig || !currentRound) {
        return null;
      }

      return (
        <RoundAnswerSheetScreen
          roundNumber={currentTournamentRoundIndex + 1}
          totalRounds={activeTournamentConfig.rounds.length}
          questionsCount={currentRound.questionsCount}
          onFinishRound={onFinishRound}
          onExit={onBackToStart}
          onRestart={onRestartTournament}
        />
      );
    }

    case SCREEN.ROUND_RESULTS: {
      const currentRound =
        activeTournamentConfig?.rounds[currentTournamentRoundIndex];

      if (!activeTournamentConfig || !currentRound) {
        return null;
      }

      return (
        <RoundResultsScreen
          roundNumber={currentTournamentRoundIndex + 1}
          totalRounds={activeTournamentConfig.rounds.length}
          title={currentRound.title}
          onNextRound={onNextRound}
          onExit={onBackToStart}
          onRestart={onRestartTournament}
        />
      );
    }

    case SCREEN.TOURNAMENT_RESULTS: {
      if (!activeTournamentConfig) {
        return null;
      }

      return (
        <TournamentResultsScreen
          roundsCount={activeTournamentConfig.rounds.length}
          onRestart={onRestartTournament}
          onExit={onBackToStart}
        />
      );
    }

    case SCREEN.MODE_SELECTION:
      return (
        <ModeSelectionScreen
          onSelectMode={onSelectMode}
          onBack={onBackToGameFlowSelection}
        />
      );

    case SCREEN.BLUFF_MENU:
      return <GameModeMenu />;

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
      return <RulesModal isOpen gameMode={gameMode} onClose={onRulesClose} />;

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
