export const SCREEN = {
  MENU: 'menu',
  SETTINGS: 'settings',
  GAME: 'game',
  RULES: 'rules',
  CARD_RESULT: 'cardResult',
  FINAL: 'final',
  START: 'start',
  MODE_SELECTION: 'modeSelection',
} as const;

export type Screen =
  typeof SCREEN[keyof typeof SCREEN];