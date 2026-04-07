import * as Crypto from 'expo-crypto';
import Aes from 'react-native-aes-crypto';
const bytesToHex = (bytes: Uint8Array) =>
  Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

// Deriva chave AES-256 (64 hex chars = 32 bytes)
const getKeyHex = async (): Promise<string> => {
  const key = process.env.EXPO_PUBLIC_ENCRYPTION_KEY;
  if (!key) throw new Error('Missing encryption key');

  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, key, {
    encoding: Crypto.CryptoEncoding.HEX,
  });
};

export const encryptUtil = {
  encrypt: async (text: string): Promise<string> => {
    const keyHex = await getKeyHex();
    const ivBytes = await Crypto.getRandomBytesAsync(16); // 16 bytes
    const ivHex = bytesToHex(ivBytes);

    // Retorna base64
    const cipherBase64 = await Aes.encrypt(text, keyHex, ivHex, 'aes-256-cbc');

    return `${ivHex}:${cipherBase64}`;
  },

  decrypt: async (encrypted: string): Promise<string> => {
    const keyHex = await getKeyHex();
    const [ivHex, cipherBase64] = encrypted.split(':');

    if (!ivHex || !cipherBase64) {
      throw new Error('Formato inválido, esperado ivHex:cipherBase64');
    }

    return await Aes.decrypt(cipherBase64, keyHex, ivHex, 'aes-256-cbc');
  },
};
