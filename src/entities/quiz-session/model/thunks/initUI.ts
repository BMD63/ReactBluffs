import type { AppDispatch } from '@/app/providers/store/store';

import { SCREEN } from '../config/screen';
import { setScreen } from '../quizUISlice';

export const initUI = () => (dispatch: AppDispatch) => {
  dispatch(setScreen(SCREEN.MENU));
};