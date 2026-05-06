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