import { configureStore } from '@reduxjs/toolkit'
import { quizSessionReducer } from '@/entities/quiz-session/model/quizSessionSlice'

export const store = configureStore({
  reducer: {
    quizSession: quizSessionReducer,
  },
})