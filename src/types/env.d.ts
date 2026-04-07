declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_ENCRYPTION_KEY: string;
      EXPO_PUBLIC_MOCK: 'true' | 'false';
      EXPO_PUBLIC_LOCAL: 'true' | 'false';
      EXPO_PUBLIC_STAGE: 'true' | 'false';
    }
  }
}

export {};
