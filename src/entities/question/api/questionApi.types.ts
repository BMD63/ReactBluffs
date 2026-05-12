import type { BooleanQuestion } from '../model/questionTypes';
import type { GameMode } from '@/entities/game-mode';

export type GetQuestionsParams = {
  gameMode: GameMode;
};

export type GetQuestionsResponse = BooleanQuestion[];