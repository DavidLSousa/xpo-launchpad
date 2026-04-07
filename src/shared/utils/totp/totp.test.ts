import { TOTP, Secret } from 'otpauth';
import { totpUtil } from './totp';

jest.mock('otpauth', () => {
  return {
    TOTP: jest.fn().mockImplementation(() => ({
      generate: jest.fn().mockReturnValue('123456'),
    })),
    Secret: {
      fromBase32: jest.fn().mockReturnValue({}),
    },
  };
});

describe('totpUtil', () => {
  const mockSecret = 'JBSWY3DPEHPK3PXP';

  it('should generate TOTP with default params', () => {
    const result = totpUtil.generate({ secret: mockSecret });

    expect(result).toBe('123456');
    expect(TOTP).toHaveBeenCalledWith(
      expect.objectContaining({
        secret: expect.any(Object),
        algorithm: 'SHA512',
        digits: 6,
        period: 30,
      }),
    );
    expect(Secret.fromBase32).toHaveBeenCalledWith(mockSecret);
  });

  it('should generate TOTP with custom params', () => {
    totpUtil.generate({
      secret: mockSecret,
      digits: 8,
      period: 60,
      algorithm: 'SHA1',
    });

    expect(TOTP).toHaveBeenCalledWith(
      expect.objectContaining({
        algorithm: 'SHA1',
        digits: 8,
        period: 60,
      }),
    );
  });
});
