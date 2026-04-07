import { router } from 'expo-router';
import { storage } from '../../utils/storage';
import api from './api';

// Mocks
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    dismissAll: jest.fn(),
  },
}));

jest.mock('../../utils/storage', () => ({
  storage: {
    deleteItem: jest.fn(),
  },
}));

jest.mock('../../mocks/mockRegistry', () => ({
  mockRegistry: {
    'v2/test': { data: 'exact-match' },
    'usdt/api/price': { price: 5.5 },
  },
}));

describe('API Interceptors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete api.defaults.headers['Authorization'];
  });

  describe('Request Interceptor (Centralized Demo Mode)', () => {
    it('should return mock data for exact URL match in demo mode', async () => {
      const response = await api.get('v2/test', {
        headers: { demo: 'true' },
      });

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ data: 'exact-match' });
    });

    it('should return mock data for prefix URL match in demo mode', async () => {
      // usdt/api/price/USDT should match usdt/api/price/ prefix
      const response = await api.get('usdt/api/price/USDT', {
        headers: { demo: 'true' },
      });

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ price: 5.5 });
    });

    it('should normalize URL (remove query and leading slash)', async () => {
      const response = await api.get('/v2/test?param=1', {
        headers: { demo: 'true' },
      });

      expect(response.data).toEqual({ data: 'exact-match' });
    });

    it('should NOT intercept when demo header is missing', async () => {
      // Mocking the actual adapter to avoid real network call
      const originalAdapter = api.defaults.adapter;
      api.defaults.adapter = jest.fn().mockResolvedValue({ status: 200, data: 'real-data' });

      const response = await api.get('v2/test');

      expect(response.data).toBe('real-data');
      api.defaults.adapter = originalAdapter;
    });
  });

  describe('Response Interceptor (401 / Unauthorized)', () => {
    it("should trigger logout on 401 'jwt expired'", async () => {
      api.defaults.headers['Authorization'] = 'Bearer old-token';

      const errorResponse = {
        response: {
          data: { message: 'jwt expired', statusCode: 401 },
        },
        config: { headers: {} },
      };

      // Simula a falha na resposta
      try {
        // @ts-ignore - Acessando o interceptor de resposta manualmente para simular erro
        await api.interceptors.response.handlers[0].rejected(errorResponse);
      } catch {
        // Esperado que rejeite o erro
      }

      expect(storage.deleteItem).toHaveBeenCalledWith('token');
      expect(storage.deleteItem).toHaveBeenCalledWith('user');
      expect(router.dismissAll).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/');
    });

    it("should trigger logout on 401 'Unauthorized'", async () => {
      api.defaults.headers['Authorization'] = 'Bearer old-token';

      const errorResponse = {
        response: {
          data: { message: 'Unauthorized', statusCode: 401 },
        },
        config: { headers: {} },
      };

      try {
        // @ts-ignore
        await api.interceptors.response.handlers[0].rejected(errorResponse);
      } catch {
        // ignored
      }

      expect(storage.deleteItem).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/');
    });

    it('should NOT trigger logout if Authorization header is missing (avoid login loop)', async () => {
      delete api.defaults.headers['Authorization'];

      const errorResponse = {
        response: {
          data: { message: 'jwt expired', statusCode: 401 },
        },
        config: { headers: {} },
      };

      try {
        // @ts-ignore
        await api.interceptors.response.handlers[0].rejected(errorResponse);
      } catch {
        // ignored
      }

      expect(storage.deleteItem).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
    });

    it('should avoid infinite loop using _retry flag', async () => {
      api.defaults.headers['Authorization'] = 'Bearer old-token';

      const errorResponse = {
        response: {
          data: { message: 'jwt expired', statusCode: 401 },
        },
        config: { headers: {}, _retry: true },
      };

      try {
        // @ts-ignore
        await api.interceptors.response.handlers[0].rejected(errorResponse);
      } catch {
        // ignored
      }

      // Se _retry já é true, não deve limpar o storage novamente nesta chamada
      expect(storage.deleteItem).not.toHaveBeenCalled();
    });
  });
});
