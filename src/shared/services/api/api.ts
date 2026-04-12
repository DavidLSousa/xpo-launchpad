import axios from 'axios';
import { router } from 'expo-router';
import { mockRegistry } from '../../mocks/mockRegistry';
import { storage } from '../../utils/storage';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para Centralized Mocking (isDemo)
api.interceptors.request.use((config) => {
  const isDemo = config.headers['demo'] === 'true';

  if (isDemo) {
    // Normaliza URL: remove query params e '/' inicial para bater com o mockRegistry
    let urlPath = config.url?.split('?')[0] || '';
    if (urlPath.startsWith('/')) urlPath = urlPath.substring(1);

    // Tenta match exato primeiro
    let mockKey = Object.keys(mockRegistry).find((key) => urlPath === key);

    // Se não achar, tenta match de prefixo (para rotas dinâmicas como usdt/api/price/:currency)
    if (!mockKey) {
      mockKey = Object.keys(mockRegistry).find((key) => urlPath.startsWith(`${key}/`));
    }

    if (mockKey) {
      // @ts-ignore - Sobrescreve o adapter para retornar o mock localmente
      config.adapter = async () => {
        return {
          data: mockRegistry[mockKey],
          status: 200,
          statusText: 'OK',
          headers: config.headers,
          config: config,
          request: {},
        };
      };
    }
  }
  return config;
});

// Interceptor - token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error.response?.data?.statusCode === 401 ||
        error.response?.data?.message?.includes('Unauthorized') ||
        error.response?.data?.message?.includes('jwt expired') ||
        error.response?.data?.message?.includes('Token inválido')) &&
      api.defaults.headers['Authorization']
    ) {
      const originalRequest = error.config;

      // Evita loop infinito
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        delete api.defaults.headers['Authorization'];
        await storage.deleteItem('token');
        await storage.deleteItem('user');

        router.dismissAll();
        router.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

export default api;
