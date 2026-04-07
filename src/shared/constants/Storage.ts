export const STORAGE_KEYS = {
  // Auth (SecureStore)
  ACCESS_TOKEN: '@template:access_token',
  REFRESH_TOKEN: '@template:refresh_token',

  // User
  USER: 'user',

  // Preferences (AsyncStorage)
  APP_THEME: 'APP_THEME',
  APP_LOCALE: 'APP_LOCALE',

  // Cache
  QUERY_CACHE: '@template:query_cache',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
