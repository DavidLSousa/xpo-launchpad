import * as OTPAuth from 'otpauth';

interface GenerateTOTPParams {
  secret: string;
  digits?: number;
  period?: number;
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export const totpUtil = {
  /**
   * Generates a sync TOTP code.
   */
  generate: ({
    secret,
    digits = 6,
    period = 30,
    algorithm = 'SHA512',
  }: GenerateTOTPParams): string => {
    const totp = new OTPAuth.TOTP({
      algorithm,
      digits,
      period,
      secret: OTPAuth.Secret.fromBase32(secret),
    });

    return totp.generate();
  },
};
