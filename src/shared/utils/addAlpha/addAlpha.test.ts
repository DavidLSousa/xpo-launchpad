import { addAlpha } from './addAlpha';

describe('addAlpha', () => {
  it('should add correct alpha for 0.5 (80 hex)', () => {
    // 0.5 * 255 = 127.5 -> 128 (80 hex)
    expect(addAlpha('#FFFFFF', 0.5)).toBe('#FFFFFF80');
  });

  it('should add correct alpha for 1.0 (FF hex)', () => {
    expect(addAlpha('#000000', 1)).toBe('#000000ff');
  });

  it('should add correct alpha for 0 (00 hex)', () => {
    expect(addAlpha('#123456', 0)).toBe('#12345600');
  });

  it('should handle single digit opacity correctly (pad with 0)', () => {
    // 0.05 * 255 = 12.75 -> 13 (0D hex)
    expect(addAlpha('#FF0000', 0.05)).toBe('#FF00000d');
  });
});
