import { GAME_MODE } from '@/entities/game-mode';

import type {
  MultipleChoiceQuestionDto,
} from '../../api/questionApi.types';

export const multipleChoiceQuestionDtos: MultipleChoiceQuestionDto[] = [
  {
    id: 'mc1',
    type: 'multipleChoice',
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Какая планета самая большая в Солнечной системе?',
    options: ['Земля', 'Юпитер', 'Сатурн'],
    correctAnswer: 'Юпитер',
  },
  {
    id: 'mc2',
    type: 'multipleChoice',
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Какой язык используется для стилизации веб-страниц?',
    options: ['HTML', 'CSS', 'SQL'],
    correctAnswer: 'CSS',
  },
  {
    id: 'mc3',
    type: 'multipleChoice',
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Сколько цветов на классическом светофоре?',
    options: ['2', '3', '4'],
    correctAnswer: '3',
  },
  {
    id: 'mc4',
    type: 'multipleChoice',
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Какой океан самый большой?',
    options: ['Атлантический', 'Индийский', 'Тихий'],
    correctAnswer: 'Тихий',
  },
  {
    id: 'mc5',
    type: 'multipleChoice',
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Что из этого является системой контроля версий?',
    options: ['Git', 'Vite', 'Redux'],
    correctAnswer: 'Git',
  },
];