export const normalizeAnswer = (answer: string): string => {
  return answer
    .trim()
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[.,!?]/g, '')
    .replace(/\s+/g, ' ');
};
