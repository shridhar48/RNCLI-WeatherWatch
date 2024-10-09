export const calculateAverageTemperature = (temperatures: number[]): number => {
  if (temperatures.length === 0) return 0;
  return Math.ceil(
    temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length
  );
};
