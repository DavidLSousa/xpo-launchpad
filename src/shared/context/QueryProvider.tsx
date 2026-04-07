import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { STORAGE_KEYS } from '@/src/shared/constants/Storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 60 * 24, // 24h
      retry: 2,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: STORAGE_KEYS.QUERY_CACHE,
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
    {children}
  </PersistQueryClientProvider>
);
