import { calculateAverageTemperature } from '../../components/weeklyWeatherForecastUtils';

describe('calculateAverageTemperature', () => {
  it('calculates the average temperature correctly', () => {
    expect(calculateAverageTemperature([20, 25, 30])).toBe(25);
    expect(calculateAverageTemperature([20, 21, 22, 23, 24, 25])).toBe(23);
    expect(calculateAverageTemperature([15, 30, 45])).toBe(30);
  });

  it('returns 0 for an empty array', () => {
    expect(calculateAverageTemperature([])).toBe(0);
  });

  it('rounds up the average temperature', () => {
    expect(calculateAverageTemperature([20, 21])).toBe(21);
    expect(calculateAverageTemperature([10, 20, 30])).toBe(20);
  });
});
