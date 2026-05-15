import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from './quizSessionModel';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit'
import { calculateCardScore } from '@/entities/question';

type AnswerQuestionPayload = {
  cardIndex: number;
  questionId: string;
  answer: boolean | string;
};


type SetCardsPayload = Question[][];

type ToggleBonusPayload = {
  cardIndex: number;
  questionId: string;
};

type QuizSessionState = {
  cards: Question[][];
  currentCardIndex: number;
  answersByCard: CardAnswers[];
  currentCardScore: number;
};

const initialState: QuizSessionState = {
  cards: [],
  currentCardIndex: 0,
  answersByCard: [],
  currentCardScore: 0,
};

const quizSessionSlice = createSlice({
  name: 'quizSession',
  initialState,
  reducers: {
    setCards(
      state,
      action: PayloadAction<SetCardsPayload>
    ) {
      state.cards = action.payload
      state.answersByCard = action.payload.map(() => ({}))
    },

    answerQuestion(
      state,
      action: PayloadAction<AnswerQuestionPayload>
      ) {
          const { cardIndex, questionId, answer } = action.payload;
          if (!state.answersByCard[cardIndex]) {
            state.answersByCard[cardIndex] = {};
            }
            state.answersByCard[cardIndex][questionId] =
              typeof answer === 'boolean'
                ? {
                    answer,
                    bonus: false,
                  }
                : {
                    answer,
                  };
                  },

    toggleBonus(
      state,
      action: PayloadAction<ToggleBonusPayload>
    ) {
      const { cardIndex, questionId } = action.payload;

      const cardAnswers = state.answersByCard[cardIndex] || {};

      const bonusCount = Object.values(cardAnswers)
        .filter((answer) => 'bonus' in answer && answer.bonus)
        .length;

      const questionAnswer = cardAnswers[questionId];

      if (
        bonusCount >= 3 &&
        !(questionAnswer && 'bonus' in questionAnswer && questionAnswer.bonus)
      ) {
        return;
      }

      const answer =
        state.answersByCard[cardIndex]?.[questionId];

      if (!answer || !('bonus' in answer)) {
        return;
      }

      answer.bonus = !answer.bonus;
    },

    submitCard(state) {
      const card = state.cards[state.currentCardIndex];
        const answers =
          state.answersByCard[state.currentCardIndex];

        if (!card || !answers) {
          return;
        }

state.currentCardScore =
  calculateCardScore(card, answers);
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