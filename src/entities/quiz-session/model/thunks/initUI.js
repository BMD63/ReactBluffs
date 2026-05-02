import { setShowRules, setShowCardResults } from '../quizUISlice';

export const initUI = () => (dispatch) => {
  const rulesShown = localStorage.getItem('rulesShown');

  // 🟡 правила
  const shouldShowRules =
    rulesShown === 'false' || rulesShown === null;

  dispatch(setShowRules(shouldShowRules));

  // 🟡 модалка результатов всегда закрыта при старте
  dispatch(setShowCardResults(false));

};