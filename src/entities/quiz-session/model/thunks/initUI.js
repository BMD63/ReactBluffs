import { SCREEN, setScreen } from '../quizUISlice';

export const initUI = () => (dispatch) => {
  dispatch(setScreen(SCREEN.MENU));
};