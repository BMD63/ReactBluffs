import { configureStore } from '@reduxjs/toolkit'
import { quizSessionReducer } from '@/entities/quiz-session/model/quizSessionSlice'
import { quizUIReducer } from '@/entities/quiz-session/model/quizUISlice';

export const store = configureStore({
  reducer: {
    quizSession: quizSessionReducer,
    quizUI: quizUIReducer,
  },
})