import { configureStore } from '@reduxjs/toolkit';
import { quizSessionReducer, quizUIReducer } from '@/entities/quiz-session';
import { tournamentConfigReducer } from '@/entities/tournament-config';

export const store = configureStore({
  reducer: {
    quizSession: quizSessionReducer,
    quizUI: quizUIReducer,
    tournamentConfig: tournamentConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
