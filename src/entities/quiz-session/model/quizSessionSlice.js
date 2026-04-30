import { createSlice } from '@reduxjs/toolkit'
import { calculateCardScore } from './quizSessionModel'
import { generateCards } from './generateCards';
import { questions } from '@/entities/question/model/questions';

const initialState = {
  cards: [],
  currentCard: 0,
  userAnswers: [],
  showRules: false,
  showCardResults: false,
  currentCardScore: 0,
  newPlayer: false,
}

const quizSessionSlice = createSlice({
  name: 'quizSession',
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload
      state.userAnswers = action.payload.map(() => ({}))
    },

    answerQuestion(state, action) {
      const { cardIndex, questionId, answer } = action.payload

      if (!state.userAnswers[cardIndex]) {
        state.userAnswers[cardIndex] = {}
      }

      state.userAnswers[cardIndex][questionId] = {
        answer,
        bonus: false,
      }
    },

    toggleBonus(state, action) {
      const { cardIndex, questionId } = action.payload

      const cardAnswers = state.userAnswers[cardIndex] || {}

      const bonusCount = Object.values(cardAnswers)
        .filter((a) => a.bonus).length

      if (bonusCount >= 3 && !cardAnswers[questionId]?.bonus) return

      state.userAnswers[cardIndex][questionId].bonus =
        !state.userAnswers[cardIndex][questionId].bonus
    },

    submitCard(state) {
      const card = state.cards[state.currentCard];
      const answers = state.userAnswers[state.currentCard];

      state.currentCardScore = calculateCardScore(card, answers);

      state.showCardResults = true;
    },

    nextCard(state) {
      state.showCardResults = false
      state.currentCard += 1
    },

    restart(state) {
      state.currentCard = 0
      state.userAnswers = []
    },

    setShowRules(state, action) {
      state.showRules = action.payload
    },

    setNewPlayer(state) {
      state.newPlayer = true
    },

    resetGame: (state) => {
      state.cards = []
      state.currentCard = 0
      state.userAnswers = []
      state.currentCardScore = 0
      state.showCardResults = false
    }
  },
})

export const {
  setCards,
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  restart,
  setShowRules,
  setNewPlayer,
  resetGame
} = quizSessionSlice.actions

export const initGame = () => (dispatch) => {
  dispatch(resetGame());
  
  const cards = generateCards(questions);
  dispatch(setCards(cards));

  const rulesShown = localStorage.getItem('rulesShown');

  if (rulesShown === 'false' || rulesShown === null) {
    dispatch(setShowRules(true));
  }
};

export const quizSessionReducer = quizSessionSlice.reducer