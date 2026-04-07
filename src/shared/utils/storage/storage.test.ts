import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store');
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

describe('storage (Native)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { storage } = require('./storage');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use SecureStore.setItemAsync on native', async () => {
    await storage.setItem('test-key', 'test-value');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('test-key', 'test-value');
  });

  it('should use SecureStore.getItemAsync on native', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('test-value');
    const result = await storage.getItem('test-key');
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('test-key');
    expect(result).toBe('test-value');
  });

  it('should use SecureStore.deleteItemAsync on native', async () => {
    await storage.deleteItem('test-key');
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('test-key');
  });
});

describe('storage (Web)', () => {
  let storage: any;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('react-native', () => ({
      Platform: {
        OS: 'web',
      },
    }));

    if (typeof (global as any).localStorage === 'undefined') {
      const store: any = {};
      (global as any).localStorage = {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          for (const key in store) delete store[key];
        },
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    storage = require('./storage').storage;
  });

  it('should use localStorage.setItem on web', async () => {
    await storage.setItem('web-key', 'web-value');
    expect(localStorage.getItem('web-key')).toBe('web-value');
  });

  it('should use localStorage.getItem on web', async () => {
    localStorage.setItem('web-key', 'web-value');
    const result = await storage.getItem('web-key');
    expect(result).toBe('web-value');
  });

  it('should use localStorage.removeItem on web', async () => {
    localStorage.setItem('web-key', 'web-value');
    await storage.deleteItem('web-key');
    expect(localStorage.getItem('web-key')).toBeNull();
  });
});
