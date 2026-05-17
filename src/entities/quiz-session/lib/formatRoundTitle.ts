const ROUND_LABELS = [
  'ПЕРВЫЙ',
  'ВТОРОЙ',
  'ТРЕТИЙ',
  'ЧЕТВЕРТЫЙ',
  'ПЯТЫЙ',
  'ШЕСТОЙ',
  'СЕДЬМОЙ',
  'ВОСЬМОЙ',
  'ДЕВЯТЫЙ',
  'ДЕСЯТЫЙ',
];

const TOTAL_ROUND_LABELS = [
  'ОДНОГО',
  'ДВУХ',
  'ТРЕХ',
  'ЧЕТЫРЕХ',
  'ПЯТИ',
  'ШЕСТИ',
  'СЕМИ',
  'ВОСЬМИ',
  'ДЕВЯТИ',
  'ДЕСЯТИ',
];

export const formatRoundTitle = (
  cardIndex: number,
  totalCards: number
): string => {
  const roundLabel = ROUND_LABELS[cardIndex] ?? String(cardIndex + 1);
  const totalLabel = TOTAL_ROUND_LABELS[totalCards - 1] ?? String(totalCards);

  return `РАУНД ${roundLabel} ИЗ ${totalLabel}`;
};
