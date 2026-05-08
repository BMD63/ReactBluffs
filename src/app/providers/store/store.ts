import { configureStore } from '@reduxjs/toolkit'
import {
  quizSessionReducer,
    quizUIReducer,
  } from '@/entities/quiz-session';

export const store = configureStore({
  reducer: {
    quizSession: quizSessionReducer,
    quizUI: quizUIReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;