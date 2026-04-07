import { encryptUtil } from './encrypt';
import * as Crypto from 'expo-crypto';
import Aes from 'react-native-aes-crypto';

describe('encryptUtil - Unit Tests (Fase 1)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_PUBLIC_ENCRYPTION_KEY = 'test-key';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('encrypt()', () => {
    it('deve criptografar o texto e retornar no formato iv:cipher', async () => {
      const text = 'hello world';
      const result = await encryptUtil.encrypt(text);

      expect(Crypto.digestStringAsync).toHaveBeenCalled();
      expect(Aes.encrypt).toHaveBeenCalled();
      // O mock do setup retorna iv de zeros (32 chars hex para 16 bytes) e cipher fixo
      expect(result).toBe('00000000000000000000000000000000:mocked-cipher-base64');
    });

    it('deve lançar erro se a chave de criptografia estiver faltando', async () => {
      process.env.EXPO_PUBLIC_ENCRYPTION_KEY = '';
      await expect(encryptUtil.encrypt('text')).rejects.toThrow('Missing encryption key');
    });
  });

  describe('decrypt()', () => {
    it('deve descriptografar o texto corretamente', async () => {
      const encrypted = '00000000000000000000000000000000:mocked-cipher-base64';
      const result = await encryptUtil.decrypt(encrypted);

      expect(Aes.decrypt).toHaveBeenCalledWith(
        'mocked-cipher-base64',
        'mocked-digest-hex',
        '00000000000000000000000000000000',
        'aes-256-cbc',
      );
      expect(result).toBe('mocked-plain-text');
    });

    it('deve lançar erro para formato inválido', async () => {
      await expect(encryptUtil.decrypt('invalid-format')).rejects.toThrow(
        'Formato inválido, esperado ivHex:cipherBase64',
      );
    });
  });
});
