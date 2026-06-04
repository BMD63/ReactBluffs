import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useQuizActions } from '@/widgets/quiz/model/useQuizActions';
import type { GameMode } from '@/entities/game-mode';
import { loadMockTournamentConfigs } from '@/entities/tournament-config';
import { GAME_FLOW_MODE, type GameFlowMode } from '@/entities/game-flow';

import {
  SCREEN,
  setScreen,
  setGameMode,
  initGame,
  initUI,
  selectScreen,
  selectCurrentCardScore,
  selectCurrentCardData,
  selectTotalScore,
  selectGameMode,
  selectIsLoading,
  selectError,
  setGameFlowMode,
} from '@/entities/quiz-session';

import QuizScreen from '@/widgets/quiz/ui/QuizScreen';

const QuizPage = () => {
  const dispatch = useAppDispatch();

  const {
    goToMenu,
    nextQuizCard,
    restartQuiz,
    answerQuizQuestion,
    toggleQuestionBonus,
    submitQuizCard,
    closeRules,
  } = useQuizActions();

  const gameMode = useAppSelector(selectGameMode);
  const screen = useAppSelector(selectScreen);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const currentCardScore = useAppSelector(selectCurrentCardScore);

  const { currentCard, currentCardAnswers, currentCardIndex, totalCards } =
    useAppSelector(selectCurrentCardData);

  const totalScore = useAppSelector(selectTotalScore);

  useEffect(() => {
    dispatch(initUI());
    dispatch(loadMockTournamentConfigs());
  }, [dispatch]);

  const handleStart = () => {
    dispatch(setScreen(SCREEN.GAME_FLOW_SELECTION));
  };
  const handleSelectMode = (mode: GameMode) => {
    dispatch(setGameMode(mode));
    dispatch(setScreen(SCREEN.BLUFF_MENU));
  };

  const handleSelectGameFlowMode = (mode: GameFlowMode) => {
    dispatch(setGameFlowMode(mode));

    dispatch(
      setScreen(
        mode === GAME_FLOW_MODE.TRAINING
          ? SCREEN.MODE_SELECTION
          : SCREEN.MODE_SELECTION
      )
    );
  };

  const handleBackToStart = () => {
    dispatch(setScreen(SCREEN.START));
  };

  const handleBackToGameFlowSelection = () => {
    dispatch(setScreen(SCREEN.GAME_FLOW_SELECTION));
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="screen-transition">
          <div className="modal">
            <h2>Загружаем вопросы</h2>
            <p>Готовим раунд</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="screen-transition">
          <div className="modal">
            <h2>Ошибка</h2>

            <p>{error}</p>

            <button
              type="button"
              className="primary-button"
              onClick={() => dispatch(initGame())}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="screen-transition" key={screen}>
        <QuizScreen
          screen={screen}
          currentCard={currentCard}
          currentCardAnswers={currentCardAnswers}
          currentCardIndex={currentCardIndex}
          totalCards={totalCards}
          currentCardScore={currentCardScore}
          totalScore={totalScore}
          gameMode={gameMode}
          onAnswer={answerQuizQuestion}
          onBonus={toggleQuestionBonus}
          onSubmit={submitQuizCard}
          onRestart={restartQuiz}
          onRulesClose={closeRules}
          onNextCard={nextQuizCard}
          onGoToMenu={goToMenu}
          onStart={handleStart}
          onSelectMode={handleSelectMode}
          onSelectGameFlowMode={handleSelectGameFlowMode}
          onBackToStart={handleBackToStart}
          onBackToGameFlowSelection={handleBackToGameFlowSelection}
        />
      </div>
    </div>
  );
};

export default QuizPage;
