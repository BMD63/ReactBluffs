export const GAME_FLOW_MODE = {
  TRAINING: 'training',
  TOURNAMENT: 'tournament',
} as const;

export type GameFlowMode = (typeof GAME_FLOW_MODE)[keyof typeof GAME_FLOW_MODE];
