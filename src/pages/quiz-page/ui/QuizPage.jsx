import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  setShowRules,
  setNewPlayer,
  initGame
} from '@/entities/quiz-session/model/quizSessionSlice'

import { questions } from '@/entities/question/model/questions';
import { calculateCardScore } from '@/entities/quiz-session/model/quizSessionModel'
import { selectTotalScore } from '@/entities/quiz-session/model/selectors';

import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import '@/App.css';

const QuizPage = () => {

  const dispatch = useDispatch()
  const quizQuestions = questions;

  const {
    cards,
    currentCard,
    userAnswers,
    showRules,
    showCardResults,
    currentCardScore,
  } = useSelector((state) => state.quizSession)
 
    const handleNewPlayer = () => {
      localStorage.setItem('rulesShown', 'false');
      dispatch(initGame(quizQuestions));
    };
  
  
  const handleNextCard = () => {
    dispatch(nextCard());
  };

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame(quizQuestions));
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

      {currentCard < cards.length && cards[currentCard] && (
        <Card
          cardData={cards[currentCard]}
          cardIndex={currentCard}
          userAnswers={userAnswers?.[currentCard] || {}}
          onAnswer={(cardIndex, questionId, answer) =>
            dispatch(answerQuestion({ cardIndex, questionId, answer }))
          }
          onBonus={(cardIndex, questionId) =>
            dispatch(toggleBonus({ cardIndex, questionId }))
          }
          onSubmit={() => dispatch(submitCard())}
          onRestart={() => dispatch(initGame(quizQuestions))}
          totalCards={cards.length}
        />
      )}

      <CardResultsModal
        isOpen={showCardResults}
        cardData={cards[currentCard]}
        cardIndex={currentCard}
        score={currentCardScore}
        onNext={handleNextCard}
        isLastCard={currentCard === cards.length - 1}
        userAnswers={userAnswers[currentCard]}
        onRestart={() => dispatch(initGame(quizQuestions))}
      />
      <div className="top-bar">
      </div>
      {currentCard >= cards.length && <FinalResultsModal
        isOpen={currentCard >= cards.length}
        totalScore={totalScore}
        onRestart={() => {
          dispatch(initGame(quizQuestions));
        }}
        onNewPlayer={handleNewPlayer}
      />}
    </div>
  );
};

export default QuizPage;