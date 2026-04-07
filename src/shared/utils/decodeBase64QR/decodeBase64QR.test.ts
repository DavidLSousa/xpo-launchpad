import jsQR from 'jsqr';
import { PNG } from 'pngjs/browser';
import { decodeBase64QR } from './decodeBase64QR';

jest.mock('jsqr');
jest.mock('pngjs/browser');

describe('decodeBase64QR', () => {
  const mockBase64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return decoded data when QR is valid', async () => {
    // Mock PNG.parse to succeed
    (PNG as any).prototype.parse = jest.fn().mockImplementation((buffer, cb) => {
      cb(null, { data: Buffer.from([0, 0, 0, 0]), width: 1, height: 1 });
    });

    // Mock jsQR to return data
    (jsQR as jest.Mock).mockReturnValue({ data: 'decoded-pix-data' });

    const result = await decodeBase64QR(mockBase64);
    expect(result).toBe('decoded-pix-data');
  });

  it('should return null when PNG parsing fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (PNG as any).prototype.parse = jest.fn().mockImplementation((buffer, cb) => {
      cb(new Error('Parse error'), null);
    });

    const result = await decodeBase64QR(mockBase64);
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  it('should return null when jsQR finds no code', async () => {
    (PNG as any).prototype.parse = jest.fn().mockImplementation((buffer, cb) => {
      cb(null, { data: Buffer.from([0, 0, 0, 0]), width: 1, height: 1 });
    });

    (jsQR as jest.Mock).mockReturnValue(null);

    const result = await decodeBase64QR(mockBase64);
    expect(result).toBeNull();
  });

  it('should handle error in catch block and return null', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (PNG as any).prototype.parse = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const result = await decodeBase64QR(mockBase64);
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});
