import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useQuizActions } from '@/widgets/quiz/model/useQuizActions';
import { GAME_MODE, type GameMode } from '@/entities/game-mode';
import {
  loadMockTournamentConfigs,
  selectActiveTournamentConfig,
} from '@/entities/tournament-config';
import { GAME_FLOW_MODE, type GameFlowMode } from '@/entities/game-flow';
import { questionApi } from '@/entities/question/api/questionApi';
import { createTournamentQuestionPlan } from '@/entities/quiz-session/model/createTournamentQuestionPlan';
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
  selectCurrentTournamentRoundIndex,
  setCurrentTournamentRoundIndex,
  selectCurrentTournamentQuestionIndex,
  setCurrentTournamentQuestions,
  setCurrentTournamentQuestionIndex,
  setLoading,
  setError,
  selectCurrentTournamentQuestions,
  setTournamentQuestionAnswer,
  selectTournamentAnswersByQuestionId,
  setTournamentQuestionPlan,
  selectTournamentQuestionIdsByRoundId,
  selectTournamentQuestionsById,
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
  const currentTournamentRoundIndex = useAppSelector(
    selectCurrentTournamentRoundIndex
  );
  const currentTournamentQuestionIndex = useAppSelector(
    selectCurrentTournamentQuestionIndex
  );

  const tournamentQuestionIdsByRoundId = useAppSelector(
    selectTournamentQuestionIdsByRoundId
  );

  const tournamentQuestionsById = useAppSelector(selectTournamentQuestionsById);

  const { currentCard, currentCardAnswers, currentCardIndex, totalCards } =
    useAppSelector(selectCurrentCardData);

  const totalScore = useAppSelector(selectTotalScore);

  const activeTournamentConfig = useAppSelector(selectActiveTournamentConfig);

  const tournamentAnswersByQuestionId = useAppSelector(
    selectTournamentAnswersByQuestionId
  );

  useEffect(() => {
    dispatch(initUI());
    dispatch(loadMockTournamentConfigs());
  }, [dispatch]);

  const getGameModeByTournamentRoundType = (type: string): GameMode => {
    switch (type) {
      case 'boolean':
        return GAME_MODE.BLUFF;

      case 'multipleChoice':
        return GAME_MODE.MULTIPLE_CHOICE;

      case 'openText':
      case 'image':
      case 'audio':
        return GAME_MODE.OPEN_ANSWER;

      default:
        return GAME_MODE.OPEN_ANSWER;
    }
  };

  const handleStart = () => {
    dispatch(setScreen(SCREEN.GAME_FLOW_SELECTION));
  };
  const handleSelectMode = (mode: GameMode) => {
    dispatch(setGameMode(mode));
    dispatch(setScreen(SCREEN.BLUFF_MENU));
  };

  const currentTournamentQuestions = useAppSelector(
    selectCurrentTournamentQuestions
  );

  const handleSelectGameFlowMode = (mode: GameFlowMode) => {
    dispatch(setGameFlowMode(mode));

    dispatch(
      setScreen(
        mode === GAME_FLOW_MODE.TRAINING
          ? SCREEN.MODE_SELECTION
          : SCREEN.TOURNAMENT_INTRO
      )
    );
  };

  const handleBackToStart = () => {
    dispatch(setScreen(SCREEN.START));
  };

  const handleBackToGameFlowSelection = () => {
    dispatch(setScreen(SCREEN.GAME_FLOW_SELECTION));
  };

  const handleOpenRules = () => {
    dispatch(setScreen(SCREEN.RULES));
  };

  const handleStartTournament = async () => {
    if (!activeTournamentConfig) {
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const questionsByRoundId = Object.fromEntries(
        await Promise.all(
          activeTournamentConfig.rounds.map(async (round) => {
            const questions = await questionApi.getQuestions({
              gameMode: getGameModeByTournamentRoundType(round.type),
            });

            return [round.id, questions];
          })
        )
      );

      const questionPlan = createTournamentQuestionPlan({
        tournamentConfig: activeTournamentConfig,
        questionsByRoundId,
      });

      dispatch(setTournamentQuestionPlan(questionPlan));
      dispatch(setCurrentTournamentRoundIndex(0));
      dispatch(setCurrentTournamentQuestionIndex(0));
      dispatch(setScreen(SCREEN.ROUND_INTRO));
    } catch {
      dispatch(setError('Не удалось подготовить турнир'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleStartRound = () => {
    const currentRound =
      activeTournamentConfig?.rounds[currentTournamentRoundIndex];

    if (!currentRound) {
      return;
    }

    const questionIds = tournamentQuestionIdsByRoundId[currentRound.id] ?? [];

    const questions = questionIds
      .map((questionId) => tournamentQuestionsById[questionId])
      .filter((question): question is NonNullable<typeof question> =>
        Boolean(question)
      );

    dispatch(setCurrentTournamentQuestions(questions));
    dispatch(setCurrentTournamentQuestionIndex(0));
    dispatch(setScreen(SCREEN.TOURNAMENT_QUESTION));
  };

  const handleRestartTournament = () => {
    dispatch(setScreen(SCREEN.TOURNAMENT_INTRO));
  };

  const handleChangeTournamentAnswer = (
    questionId: string,
    answer: string | boolean
  ) => {
    dispatch(setTournamentQuestionAnswer({ questionId, answer }));
  };

  const handleAnswerTournamentQuestion = () => {
    const currentRound =
      activeTournamentConfig?.rounds[currentTournamentRoundIndex];

    if (!currentRound) {
      return;
    }

    const nextQuestionIndex = currentTournamentQuestionIndex + 1;

    if (nextQuestionIndex >= currentRound.questionsCount) {
      dispatch(setScreen(SCREEN.ROUND_ANSWER_SHEET));
      return;
    }

    dispatch(setCurrentTournamentQuestionIndex(nextQuestionIndex));
  };

  const handleNextRound = () => {
    if (!activeTournamentConfig) {
      return;
    }

    const nextRoundIndex = currentTournamentRoundIndex + 1;

    if (nextRoundIndex >= activeTournamentConfig.rounds.length) {
      dispatch(setScreen(SCREEN.TOURNAMENT_RESULTS));
      return;
    }

    dispatch(setCurrentTournamentRoundIndex(nextRoundIndex));
    dispatch(setCurrentTournamentQuestionIndex(0));
    dispatch(setScreen(SCREEN.ROUND_INTRO));
  };

  const handleFinishRound = () => {
    // временно, пока нет экрана результатов тура
    dispatch(setScreen(SCREEN.ROUND_RESULTS));
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
          activeTournamentConfig={activeTournamentConfig}
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
          onRulesOpen={handleOpenRules}
          onStartTournament={handleStartTournament}
          onStartRound={handleStartRound}
          onRestartTournament={handleRestartTournament}
          onNextRound={handleNextRound}
          onFinishRound={handleFinishRound}
          currentTournamentRoundIndex={currentTournamentRoundIndex}
          currentTournamentQuestionIndex={currentTournamentQuestionIndex}
          onAnswerTournamentQuestion={handleAnswerTournamentQuestion}
          currentTournamentQuestions={currentTournamentQuestions}
          tournamentAnswersByQuestionId={tournamentAnswersByQuestionId}
          onChangeTournamentAnswer={handleChangeTournamentAnswer}
        />
      </div>
    </div>
  );
};

export default QuizPage;
