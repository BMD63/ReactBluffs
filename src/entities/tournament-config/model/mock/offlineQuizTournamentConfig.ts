import type { TournamentConfig } from '../tournamentConfigTypes';

export const offlineQuizTournamentConfig: TournamentConfig = {
  id: 'offline-quiz',
  title: 'Offline Quiz Tournament',

  rounds: [
    {
      id: 'round-1',
      title: 'Разминка',
      type: 'openText',
      difficulty: 'easy',

      questionsCount: 2,

      questionTimeSeconds: 30,
      correctionTimeSeconds: 60,
    },

    // {
    //   id: 'round-2',
    //   title: 'Второй тур',
    //   type: 'openText',
    //   difficulty: 'medium',

    //   questionsCount: 3,

    //   questionTimeSeconds: 30,
    //   correctionTimeSeconds: 60,
    // },

    // {
    //   id: 'round-3',
    //   title: 'Блефы',
    //   type: 'boolean',
    //   difficulty: 'medium',

    //   questionsCount: 2,

    //   questionTimeSeconds: 20,
    //   correctionTimeSeconds: 30,

    //   bonusAnswersLimit: 3,
    // },

    {
      id: 'round-4',
      title: 'Аудио',
      type: 'audio',
      difficulty: 'medium',

      questionsCount: 2,

      questionTimeSeconds: 45,
      correctionTimeSeconds: 90,
    },

    {
      id: 'round-5',
      title: 'Картинки',
      type: 'image',
      difficulty: 'medium',

      questionsCount: 2,

      questionTimeSeconds: 90,
      correctionTimeSeconds: 90,
    },

    // {
    //   id: 'round-6',
    //   title: 'Сложный тур',
    //   type: 'openText',
    //   difficulty: 'hard',

    //   questionsCount: 8,

    //   questionTimeSeconds: 30,
    //   correctionTimeSeconds: 60,
    // },

    // {
    //   id: 'round-7',
    //   title: 'Три варианта',
    //   type: 'multipleChoice',
    //   difficulty: 'hard',

    //   questionsCount: 8,

    //   questionTimeSeconds: 25,
    //   correctionTimeSeconds: 60,
    // },
  ],
};
