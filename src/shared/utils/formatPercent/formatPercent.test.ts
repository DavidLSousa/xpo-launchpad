import { formatPercent } from './formatPercent';

describe('formatPercent', () => {
  it("should return '-' for empty value", () => {
    expect(formatPercent({ value: 0 })).toBe('-');
    expect(formatPercent({ value: null as any })).toBe('-');
  });

  it('should format BRL (comma decimal)', () => {
    expect(formatPercent({ value: 10.5 })).toBe('10,50%');
  });

  it('should format USD (dot decimal)', () => {
    expect(formatPercent({ value: 10.5, currency: 'USD' })).toBe('10.50%');
  });

  it('should handle integer values correctly', () => {
    expect(formatPercent({ value: 100 })).toBe('100,00%');
  });
});
