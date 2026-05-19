export const calculateLevenshteinDistance = (
  first: string,
  second: string
): number => {
  const matrix = Array.from({ length: second.length + 1 }, () =>
    Array(first.length + 1).fill(0)
  );

  for (let index = 0; index <= first.length; index += 1) {
    matrix[0]![index] = index;
  }

  for (let index = 0; index <= second.length; index += 1) {
    matrix[0]![index] = index;
  }

  for (let row = 1; row <= second.length; row += 1) {
    for (let column = 1; column <= first.length; column += 1) {
      const cost = second[row - 1] === first[column - 1] ? 0 : 1;

      matrix[row]![column] = Math.min(
        matrix[row - 1]![column] + 1,
        matrix[row]![column - 1] + 1,
        matrix[row - 1]![column - 1] + cost
      );
    }
  }

  return matrix[second.length]![first.length];
};
