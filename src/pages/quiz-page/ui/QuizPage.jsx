import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useQuizActions } from '@/widgets/quiz/model/useQuizActions';

import {
  initGame,
  initUI,
  selectScreen,
  selectCurrentCardScore,
  selectCurrentCardData,
  selectTotalScore,
} from '@/entities/quiz-session';

import QuizScreen from '@/widgets/quiz/ui/QuizScreen';

const QuizPage = () => {

  const dispatch = useDispatch()

  const {
    goToMenu,
    nextQuizCard,
    restartQuiz,
    answerQuizQuestion,
    toggleQuestionBonus,
    submitQuizCard,
    closeRules,
  } = useQuizActions();

  const screen = useSelector(selectScreen);
  const currentCardScore = useSelector(selectCurrentCardScore);

  const {
  currentCard,
  currentCardAnswers,
  currentCardIndex,
  totalCards,
} = useSelector(selectCurrentCardData);

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
    dispatch(initUI());
  }, [dispatch]);

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
        />
      </div>
    </div>
 );
};

export default QuizPage;