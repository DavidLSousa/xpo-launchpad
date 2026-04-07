import { formatDate } from './formatDate';

describe('formatDate', () => {
  const mockDate = '2024-03-20T10:00:00Z';

  it("should return '-' if dateString is empty", () => {
    expect(formatDate({ dateString: '', dateStyle: 'short' })).toBe('-');
  });

  it("should return '-' if dateString is invalid", () => {
    expect(formatDate({ dateString: 'invalid-date', dateStyle: 'short' })).toBe('-');
  });

  it('should format date correctly in PT-BR (default)', () => {
    // short: 20/03/2024
    const result = formatDate({
      dateString: mockDate,
      dateStyle: 'short',
      currency: 'pt',
    });
    expect(result).toMatch(/20\/03\/2024/);
  });

  it('should format date correctly in EN-US', () => {
    // short: 3/20/24
    const result = formatDate({
      dateString: mockDate,
      dateStyle: 'short',
      currency: 'en',
    });
    expect(result).toMatch(/3\/20\/24/);
  });

  it('should include time when timeStyle is provided', () => {
    const result = formatDate({
      dateString: mockDate,
      dateStyle: 'short',
      timeStyle: 'short',
      currency: 'pt',
    });
    // Ex: 20/03/2024 10:00 or similar depending on env
    expect(result).toContain('2024');
    expect(result).toMatch(/\d{2}:\d{2}/);
  });
});
