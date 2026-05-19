import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useQuizActions } from '@/widgets/quiz/model/useQuizActions';
import type { GameMode } from '@/entities/game-mode';

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
  const currentCardScore = useAppSelector(selectCurrentCardScore);

  const { currentCard, currentCardAnswers, currentCardIndex, totalCards } =
    useAppSelector(selectCurrentCardData);

  const totalScore = useAppSelector(selectTotalScore);

  useEffect(() => {
    dispatch(initGame());
    dispatch(initUI());
  }, [dispatch]);

  const handleStart = () => {
    dispatch(setScreen(SCREEN.MODE_SELECTION));
  };
  const handleSelectMode = (mode: GameMode) => {
    dispatch(setGameMode(mode));
    dispatch(setScreen(SCREEN.BLUFF_MENU));
  };

  const handleBackToStart = () => {
    dispatch(setScreen(SCREEN.START));
  };

  return (
  <div className="app">
    <div
      style={{
        position: 'fixed',
        left: 8,
        bottom: 8,
        zIndex: 9999,
        padding: '6px 8px',
        borderRadius: 8,
        background: 'rgba(0,0,0,0.75)',
        color: 'white',
        fontSize: 12,
        lineHeight: 1.3,
      }}
    >
      {`inner: ${window.innerWidth}×${window.innerHeight}`}
      <br />
      {`visual: ${Math.round(window.visualViewport?.width ?? 0)}×${Math.round(
        window.visualViewport?.height ?? 0
      )}`}
      <br />
      {`dpr: ${window.devicePixelRatio}`}
    </div>

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
        onBackToStart={handleBackToStart}
      />
    </div>
  </div>
);
  // return (
  //   <div className="app">
  //     <div className="screen-transition" key={screen}>
  //       <QuizScreen
  //         screen={screen}
  //         currentCard={currentCard}
  //         currentCardAnswers={currentCardAnswers}
  //         currentCardIndex={currentCardIndex}
  //         totalCards={totalCards}
  //         currentCardScore={currentCardScore}
  //         totalScore={totalScore}
  //         gameMode={gameMode}
  //         onAnswer={answerQuizQuestion}
  //         onBonus={toggleQuestionBonus}
  //         onSubmit={submitQuizCard}
  //         onRestart={restartQuiz}
  //         onRulesClose={closeRules}
  //         onNextCard={nextQuizCard}
  //         onGoToMenu={goToMenu}
  //         onStart={handleStart}
  //         onSelectMode={handleSelectMode}
  //         onBackToStart={handleBackToStart}
  //       />
  //     </div>
  //   </div>
  // );
};

export default QuizPage;
