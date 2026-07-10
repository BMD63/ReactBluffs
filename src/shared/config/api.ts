export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export const API_ENDPOINTS = {
  QUESTIONS: '/api/questions',
  TOURNAMENT_CONFIGS: '/api/tournament-configs',
} as const;
