import { setScreen } from '../quizUISlice';
import { SCREEN } from '../config/screen';

export const initUI = () => (dispatch) => {
  dispatch(setScreen(SCREEN.MENU));
};