type QuestionRow = {
  id: string;
  type: string;
  game_mode: string;
  text: string;
  answer: string | null;
  aliases: string[] | null;
  options: string[] | null;
  category: string | null;
  media_type: string | null;
  media_url: string | null;
  media_alt: string | null;
};

export const mapQuestionRowToDto = (question: QuestionRow) => ({
  id: question.id,
  type: question.type,
  gameMode: question.game_mode,
  text: question.text,

  ...(question.type === 'openText'
    ? { answer: question.answer }
    : question.type === 'multipleChoice'
      ? { correctAnswer: question.answer }
      : { correctAnswer: question.answer === 'true' }),

  aliases: question.aliases ?? undefined,
  options: question.options ?? undefined,
  category: question.category ?? undefined,

  media:
    question.media_type && question.media_url
      ? {
          type: question.media_type,
          url: question.media_url,
          alt: question.media_alt ?? undefined,
        }
      : undefined,
});
