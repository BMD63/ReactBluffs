const selectQuizUI = (state) => state.quizUI;

export const selectShowRules = (state) =>
  selectQuizUI(state).showRules;

export const selectShowCardResults = (state) =>
  selectQuizUI(state).showCardResults;