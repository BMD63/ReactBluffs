import { createSlice } from '@reduxjs/toolkit'
import { calculateCardScore } from './quizSessionModel'

const initialState = {
  cards: [],
  currentCardIndex: 0,
  answersByCard: [],
  currentCardScore: 0,
}

const quizSessionSlice = createSlice({
  name: 'quizSession',
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload
      state.answersByCard = action.payload.map(() => ({}))
    },

    answerQuestion(state, action) {
      const { cardIndex, questionId, answer } = action.payload;

      if (!state.answersByCard[cardIndex]) {
        state.answersByCard[cardIndex] = {};
      }

      state.answersByCard[cardIndex][questionId] = {
        answer,
        bonus: false,
      };
    },

    toggleBonus(state, action) {
      const { cardIndex, questionId } = action.payload;

      const cardAnswers = state.answersByCard[cardIndex] || {};

      const bonusCount = Object.values(cardAnswers)
        .filter((a) => a.bonus).length;

      if (bonusCount >= 3 && !cardAnswers[questionId]?.bonus) return;

      state.answersByCard[cardIndex][questionId].bonus =
        !state.answersByCard[cardIndex][questionId].bonus;
    },

    submitCard(state) {
      const card = state.cards[state.currentCardIndex];
      const answers = state.answersByCard[state.currentCardIndex];

      state.currentCardScore = calculateCardScore(card, answers);
    },

    nextCard(state) {
      state.currentCardIndex += 1
    },

    resetGame: (state) => {
      state.cards = []
      state.currentCardIndex = 0
      state.answersByCard = []
      state.currentCardScore = 0
    }
  },
})

export const {
  setCards,
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  resetGame
} = quizSessionSlice.actions

export const quizSessionReducer = quizSessionSlice.reducer