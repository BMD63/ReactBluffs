export const GAME_MODE = {
  BLUFF: 'bluff',
  MULTIPLE_CHOICE: 'multipleChoice',
  OPEN_ANSWER: 'openAnswer',
} as const;

export type GameMode =
  typeof GAME_MODE[keyof typeof GAME_MODE];