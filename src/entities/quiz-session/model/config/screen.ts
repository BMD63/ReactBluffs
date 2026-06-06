export const SCREEN = {
  SETTINGS: 'settings',
  GAME: 'game',
  RULES: 'rules',
  CARD_RESULT: 'cardResult',
  FINAL: 'final',
  START: 'start',
  GAME_FLOW_SELECTION: 'gameFlowSelection',
  TOURNAMENT_INTRO: 'tournamentIntro',
  MODE_SELECTION: 'modeSelection',
  BLUFF_MENU: 'bluffMenu',
  ROUND_INTRO: 'roundIntro',
  TOURNAMENT_QUESTION: 'tournamentQuestion',
} as const;

export type Screen = (typeof SCREEN)[keyof typeof SCREEN];
