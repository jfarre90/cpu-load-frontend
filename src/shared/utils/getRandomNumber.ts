export const getRandomNumber = (minNumber: number, maxNumber: number) =>
  Math.random() * (maxNumber - minNumber) + minNumber;
