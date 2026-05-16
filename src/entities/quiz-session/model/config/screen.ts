export const SCREEN = {
  SETTINGS: 'settings',
  GAME: 'game',
  RULES: 'rules',
  CARD_RESULT: 'cardResult',
  FINAL: 'final',
  START: 'start',
  MODE_SELECTION: 'modeSelection',
  BLUFF_MENU: 'bluffMenu',
} as const;

export type Screen = (typeof SCREEN)[keyof typeof SCREEN];
