import { z } from 'zod';

import { QUESTION_TYPE } from '@/entities/question';

import {
  TOURNAMENT_DIFFICULTIES,
  type TournamentRoundConfig,
} from './tournamentConfigTypes';

export const roundSchema: z.ZodType<TournamentRoundConfig> = z
  .object({
    id: z.string().min(1),
    title: z.string().trim().min(1),

    type: z.enum([
      QUESTION_TYPE.BOOLEAN,
      QUESTION_TYPE.MULTIPLE_CHOICE,
      QUESTION_TYPE.OPEN_TEXT,
      QUESTION_TYPE.IMAGE,
      QUESTION_TYPE.AUDIO,
    ]),

    difficulty: z.enum(TOURNAMENT_DIFFICULTIES),

    questionsCount: z.number().int().min(1),

    questionTimeSeconds: z.number().int().min(1),
    correctionTimeSeconds: z.number().int().min(0),

    bonusAnswersLimit: z.number().int().min(0).default(0),
  })
  .superRefine((round, context) => {
    if (round.bonusAnswersLimit > round.questionsCount) {
      context.addIssue({
        code: 'custom',
        path: ['bonusAnswersLimit'],
        message: 'Bonus answers limit cannot be greater than questions count.',
      });
    }
  });
