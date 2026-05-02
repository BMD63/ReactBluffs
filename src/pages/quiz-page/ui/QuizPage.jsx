import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
} from '@/entities/quiz-session/model/quizSessionSlice'

import {
  setShowCardResults,
  setShowRules,
} from '@/entities/quiz-session/model/quizUISlice';

import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { initUI } from '@/entities/quiz-session/model/thunks/initUI';
import { 
  selectShowRules, 
  selectShowCardResults, 
  selectCurrentCardScore, 
  selectIsFinished 
} from '@/entities/quiz-session/model/selectors';
import { selectTotalScore } from '@/entities/quiz-session/model/selectors';
import { selectCurrentCardData } from '@/entities/quiz-session/model/selectors';
import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import '@/App.css';

const QuizPage = () => {

  const dispatch = useDispatch()
  
  const showRules = useSelector(selectShowRules);
  const showCardResults = useSelector(selectShowCardResults);
  const currentCardScore = useSelector(selectCurrentCardScore);

  const isFinished = useSelector(selectIsFinished);

  const { card, answers, index, total } =
  useSelector(selectCurrentCardData);
 
  const handleNewPlayer = () => {
    localStorage.setItem('rulesShown', 'false');
    dispatch(initGame());
    dispatch(initUI());
  };
  
  
  const handleNextCard = () => {
    dispatch(setShowCardResults(false));
    dispatch(nextCard());
  };

  const handleRestart = () => {
  dispatch(setShowCardResults(false));
  dispatch(initGame());
};

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
    dispatch(initUI());
  }, [dispatch]);

  useEffect(() => {
  const rulesShown = localStorage.getItem('rulesShown');

  if (rulesShown === 'false' || rulesShown === null) {
    dispatch(setShowRules(true));
  }
}, []);

  return (
    <div className="app">
      <RulesModal 
        isOpen={showRules}
        onClose={() => {
          localStorage.setItem('rulesShown', 'true');
          dispatch(setShowRules(false));
        }}
      />

      { card?.length > 0 && !isFinished && (
        <Card
          cardData={card}
          cardIndex={index}
          userAnswers={answers}
          onAnswer={(cardIndex, questionId, answer) =>
            dispatch(answerQuestion({ cardIndex, questionId, answer }))
          }
          onBonus={(cardIndex, questionId) =>
            dispatch(toggleBonus({ cardIndex, questionId }))
          }
          onSubmit={() => 
            { dispatch(submitCard());
            dispatch(setShowCardResults(true));
          }}
          onRestart={handleRestart}
          totalCards={total}
        />
      )}

      <CardResultsModal
        isOpen={showCardResults}
        cardData={card}
        cardIndex={index}
        score={currentCardScore}
        onNext={handleNextCard}
        isLastCard={index === total - 1}
        userAnswers={answers}
        onRestart={handleRestart}
      />
      <div className="top-bar">
      </div>
      {isFinished && <FinalResultsModal
        isOpen={isFinished}
        totalScore={totalScore}
        onRestart={handleRestart}
        onNewPlayer={handleNewPlayer}
      />}
    </div>
  );
};

export default QuizPage;