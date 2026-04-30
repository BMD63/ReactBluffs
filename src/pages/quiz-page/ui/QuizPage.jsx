import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  setShowRules,
  setNewPlayer,
} from '@/entities/quiz-session/model/quizSessionSlice'

import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { selectShowRules, selectShowCardResults, selectCurrentCardScore } from '@/entities/quiz-session/model/selectors';
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

  const { card, answers, index, total, isFinished } =
  useSelector(selectCurrentCardData);
 
  const handleNewPlayer = () => {
    localStorage.setItem('rulesShown', 'false');
    dispatch(initGame());
  };
  
  
  const handleNextCard = () => {
    dispatch(nextCard());
  };

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);

  return (
    <div className="app">
      <RulesModal 
        isOpen={showRules}
        onClose={() => {
          localStorage.setItem('rulesShown', 'true');
          dispatch(setShowRules(false));
        }}
      />

      { card?.length > 0 && (
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
          onSubmit={() => dispatch(submitCard())}
          onRestart={() => dispatch(initGame())}
          totalCards={total}
        />
      )}

      <CardResultsModal
        isOpen={showCardResults}
        cardData={card}
        cardIndex={index}
        score={currentCardScore}
        onNext={handleNextCard}
        isLastCard={isFinished}
        userAnswers={answers}
        onRestart={() => dispatch(initGame())}
      />
      <div className="top-bar">
      </div>
      {isFinished && <FinalResultsModal
        isOpen={isFinished}
        totalScore={totalScore}
        onRestart={() => dispatch(initGame())}
        onNewPlayer={handleNewPlayer}
      />}
    </div>
  );
};

export default QuizPage;