import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/redux';
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

  const screen = useAppSelector(selectScreen);
  const currentCardScore = useAppSelector(selectCurrentCardScore);

  const {
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  totalCards,
  } = useAppSelector(selectCurrentCardData);

  const totalScore = useAppSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
    dispatch(initUI());
  }, [dispatch]);

  const handleStart = () => {
    dispatch(setScreen(SCREEN.MODE_SELECTION));
  };
  const handleSelectMode = (
  mode: GameMode
) => {
  dispatch(setGameMode(mode));
  dispatch(setScreen(SCREEN.BLUFF_MENU));
};

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
          onAnswer={answerQuizQuestion}
          onBonus={toggleQuestionBonus}
          onSubmit={submitQuizCard}
          onRestart={restartQuiz}
          onRulesClose={closeRules}
          onNextCard={nextQuizCard}
          onGoToMenu={goToMenu}
          onStart={handleStart}
          onSelectMode={handleSelectMode}
        />
      </div>
    </div>
 );
};

export default QuizPage;