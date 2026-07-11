import { z } from 'zod';

import { QUESTION_TYPE } from '../../question/model/questionTypes';

import { TOURNAMENT_DIFFICULTIES } from '../model/tournamentConfigTypes';

export const tournamentRoundConfigDtoSchema = z.object({
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
});

export const tournamentConfigDtoSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().default(''),
  rounds: z.array(tournamentRoundConfigDtoSchema).default([]),
});

export const tournamentConfigDtosSchema = z.array(tournamentConfigDtoSchema);
