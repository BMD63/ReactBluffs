import { GAME_MODE, type GameMode } from '@/entities/game-mode';

export const getGameModeByTournamentRoundType = (type: string): GameMode => {
  switch (type) {
    case 'boolean':
      return GAME_MODE.BLUFF;

    case 'multipleChoice':
      return GAME_MODE.MULTIPLE_CHOICE;

    case 'openText':
    case 'image':
    case 'audio':
      return GAME_MODE.OPEN_ANSWER;

    default:
      return GAME_MODE.OPEN_ANSWER;
  }
};
