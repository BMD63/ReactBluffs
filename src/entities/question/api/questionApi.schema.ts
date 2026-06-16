import { z } from 'zod';

const baseQuestionSchema = z.object({
  id: z.string().min(1),
  gameMode: z.enum(['bluff', 'multipleChoice', 'openAnswer']),
  text: z.string().trim().min(1, 'Question text is required'),
  category: z.string().trim().min(1).default('general'),
});

export const booleanQuestionDtoSchema = baseQuestionSchema.extend({
  type: z.literal('boolean'),
  gameMode: z.literal('bluff'),
  correctAnswer: z.boolean(),
});

export const multipleChoiceQuestionDtoSchema = baseQuestionSchema.extend({
  type: z.literal('multipleChoice'),
  gameMode: z.literal('multipleChoice'),
  options: z.array(z.string().trim().min(1)).length(3),
  correctAnswer: z.string().trim().min(1, 'Correct answer is required'),
});

export const openTextQuestionDtoSchema = baseQuestionSchema.extend({
  type: z.literal('openText'),
  gameMode: z.literal('openAnswer'),
  answer: z.string().trim().min(1, 'Answer is required'),
  aliases: z.array(z.string().trim().min(1)).optional(),
});

export const imageQuestionDtoSchema = baseQuestionSchema.extend({
  type: z.literal('image'),
  gameMode: z.literal('openAnswer'),
  answer: z.string().trim().min(1, 'Answer is required'),
  aliases: z.array(z.string().trim().min(1)).optional(),
  media: z.object({
    type: z.literal('image'),
    url: z.string().trim().min(1, 'Image URL is required'),
    alt: z.string().trim().min(1).optional(),
  }),
});

export const audioQuestionDtoSchema = baseQuestionSchema.extend({
  type: z.literal('audio'),
  gameMode: z.literal('openAnswer'),
  audioUrl: z.string().trim().min(1, 'Audio URL is required'),
  answer: z.string().trim().min(1, 'Answer is required'),
  aliases: z.array(z.string().trim().min(1)).optional(),
  media: z.object({
    type: z.literal('audio'),
    url: z.string().trim().min(1, 'Audio URL is required'),
    alt: z.string().trim().min(1).optional(),
  }),
});

export const createQuestionDtoSchema = z.discriminatedUnion('type', [
  booleanQuestionDtoSchema,
  multipleChoiceQuestionDtoSchema,
  openTextQuestionDtoSchema,
  imageQuestionDtoSchema,
  audioQuestionDtoSchema,
]);

export type CreateQuestionDtoSchema = z.infer<typeof createQuestionDtoSchema>;
