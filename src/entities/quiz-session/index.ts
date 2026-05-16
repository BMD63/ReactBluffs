export { SCREEN } from './model/config/screen';
export type { GameMode } from '../game-mode';
export type { Difficulty } from './model/config/difficultyConfig';
export {
  setScreen,
  setGameMode,
  resetUI,
  setDifficulty,
  quizUIReducer,
} from './model/quizUISlice';

export {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  quizSessionReducer,
} from './model/quizSessionSlice';

export {
  selectScreen,
  selectDifficulty,
  selectCurrentCardScore,
  selectCurrentCardData,
  selectIsFinished,
  selectTotalScore,
  selectGameMode,
} from './model/selectors';

export { initGame } from './model/thunks/initGame';
export { initUI } from './model/thunks/initUI';
