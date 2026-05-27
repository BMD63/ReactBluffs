import type { AdminQuestion, QuestionFormValues } from '../ui/admin.types';

export const createFormValuesFromQuestion = (
  question: AdminQuestion
): QuestionFormValues => ({
  questionText: question.text,
  answer: question.answer ?? '',
  aliases: question.aliases?.join('\n') ?? '',
  booleanAnswer: question.correctAnswer === true ? 'true' : 'false',
  option1: question.options?.[0] ?? '',
  option2: question.options?.[1] ?? '',
  option3: question.options?.[2] ?? '',
  multipleChoiceAnswer:
    typeof question.correctAnswer === 'string' ? question.correctAnswer : '',
});
