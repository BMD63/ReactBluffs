import { useEffect } from 'react';
import { questions } from '@/entities/question/model/questions';
import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  setShowRules,
  setNewPlayer,
  resetGame,
  initGame
} from '@/entities/quiz-session/model/quizSessionSlice'

import { calculateCardScore } from '@/entities/quiz-session/model/quizSessionModel'
import { selectTotalScore } from '@/entities/quiz-session/model/selectors';

import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import '@/App.css';

const QuizPage = () => {

  const dispatch = useDispatch()

  const {
    cards,
    currentCard,
    userAnswers,
    showRules,
    showCardResults,
    currentCardScore,
    newPlayer,
     } = useSelector((state) => state.quizSession)
 
  useEffect(() => {
    const rulesShown = localStorage.getItem('rulesShown');

    if (rulesShown !== 'true') {
      dispatch(setShowRules(true));
    }
  }, []);

  const handleNewPlayer = () => {
    dispatch(setNewPlayer());
    localStorage.setItem('rulesShown', 'false');
    dispatch(initGame(questions));
  }
  
  const handleNextCard = () => {
    dispatch(nextCard());
  };

  const totalScore = useSelector(selectTotalScore);
  
  useEffect(() => {
    dispatch(initGame());
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
      />

      {currentCard >= cards.length && <FinalResultsModal
        isOpen={currentCard >= cards.length}
        totalScore={totalScore}
        onRestart={() => {
          dispatch(initGame(questions));
        }}
        onNewPlayer={handleNewPlayer}
      />}
    </div>
  );
};

export default QuizPage;