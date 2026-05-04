import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
} from '@/entities/quiz-session/model/quizSessionSlice'

import {
  SCREEN,
  setScreen,
  resetUI,
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
import Menu from '@/widgets/quiz/ui/menu/Menu';
import Settings from '@/widgets/quiz/ui/setting/Settings';
import Card from '@/widgets/quiz/ui/quiz-card/QuizCard';
import RulesModal from '@/widgets/quiz/ui/modals/RulesModal';
import CardResultsModal from '@/widgets/quiz/ui/modals/CardResultsModal';
import FinalResultsModal from '@/widgets/quiz/ui/modals/FinalResultsModal';
import '@/App.css';

const QuizPage = () => {

  const dispatch = useDispatch()

  const screen = useSelector(selectScreen);
  const currentCardScore = useSelector(selectCurrentCardScore);

  const isFinished = useSelector(selectIsFinished);

  const { card, answers, index, total } =
  useSelector(selectCurrentCardData);

  const handleGoToMenu = () => {
    dispatch(resetUI());
  };
 
  const handleNextCard = () => {
    dispatch(nextCard());
    dispatch(setScreen(SCREEN.GAME));
  };

  const handleRestart = () => {
    dispatch(initGame());
    dispatch(setScreen(SCREEN.GAME));
  };

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

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.MENU:
        return <Menu />;

      case SCREEN.SETTINGS:
        return <Settings />;

      case SCREEN.GAME:
        return (
          <>
            {card?.length > 0 && (
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
                onSubmit={() => {
                  dispatch(submitCard());
                  dispatch(setScreen(SCREEN.CARD_RESULT));
                }}
                onRestart={handleRestart}
                totalCards={total}
              />
            )}
          </>
        );

      case SCREEN.RULES:
        return (
          <RulesModal
            isOpen
            onClose={() => {
              dispatch(setScreen(SCREEN.MENU));
            }}
          />
        );

      case SCREEN.CARD_RESULT:
        return (
          <CardResultsModal
            isOpen
            cardData={card}
            cardIndex={index}
            score={currentCardScore}
            onNext={handleNextCard}
            isLastCard={index === total - 1}
            userAnswers={answers}
            onRestart={handleRestart}
            onMenu={handleGoToMenu}
          />
        );

      case SCREEN.FINAL:
        return (
          <FinalResultsModal
            isOpen
            totalScore={totalScore}
            onRestart={handleRestart}
            onMenu={handleGoToMenu}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
};

export default QuizPage;