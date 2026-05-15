import { GAME_MODE } from '@/entities/game-mode';

import type {
  OpenTextQuestionDto,
} from '../../api/questionApi.types';

export const openAnswerQuestionDtos: OpenTextQuestionDto[] = [
  {
    id: 'oa1',
    type: 'openText',
    gameMode: GAME_MODE.OPEN_ANSWER,
    text: 'В какой группе играет Винс Кларк?',
    correctAnswers: [
      'erasure',
      'эрейжа',
      'эрежа',
      'ерейжа',
      'ережа',
    ],
  },
  {
    id: 'oa2',
    type: 'openText',
    gameMode: GAME_MODE.OPEN_ANSWER,
    text: 'Как называется система контроля версий, которую чаще всего используют разработчики?',
    correctAnswers: [
      'git',
      'гит',
    ],
  },
  {
    id: 'oa3',
    type: 'openText',
    gameMode: GAME_MODE.OPEN_ANSWER,
    text: 'Какой язык используют для стилизации веб-страниц?',
    correctAnswers: [
      'css',
      'си эс эс',
      'цсс',
    ],
  },
];