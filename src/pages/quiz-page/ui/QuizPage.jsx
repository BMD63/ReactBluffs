import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useQuizActions } from '@/widgets/quiz/model/useQuizActions';

import {
  SCREEN,
  setScreen,
} from '@/entities/quiz-session/model/quizUISlice';

import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { initUI } from '@/entities/quiz-session/model/thunks/initUI';
import { 
  selectCurrentCardScore, 
  selectIsFinished,
  selectScreen, 
} from '@/entities/quiz-session/model/selectors';
import { selectTotalScore } from '@/entities/quiz-session/model/selectors';
import { selectCurrentCardData } from '@/entities/quiz-session/model/selectors';
import '@/App.css';
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

  const isFinished = useSelector(selectIsFinished);

  const { card, answers, index, total } =
  useSelector(selectCurrentCardData);

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
    dispatch(initUI());
  }, [dispatch]);

  useEffect(() => {
    if (isFinished) {
      dispatch(setScreen(SCREEN.FINAL));
    }
  }, [isFinished, dispatch]);

  return (
    <div className="app">
      <QuizScreen
        screen={screen}
        card={card}
        answers={answers}
        index={index}
        total={total}
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
 );
};

export default QuizPage;