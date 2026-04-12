import MockAdapter from 'axios-mock-adapter';
import { api } from '@/src/shared/services/api/api';

type MockHandler = (mock: MockAdapter) => void;

/**
 * Registro de dados estáticos para o Centralized Mocking (isDemo).
 * Mapeia caminhos de URL para objetos de dados.
 */
export const mockRegistry: Record<string, any> = {
  // Exemplo: 'auth/login': { token: 'mock-token' }
};

const registry: MockHandler[] = [];

export const registerMock = (handler: MockHandler) => {
  registry.push(handler);
};

/**
 * Aplica todos os mocks registrados ao adapter do Axios.
 * Só ativo quando EXPO_PUBLIC_MOCK === 'true'.
 * NUNCA use `if (isDemo)` dentro dos services originais — use registerMock aqui.
 */
export const applyMocks = () => {
  if (!Boolean(process.env.EXPO_PUBLIC_MOCK)) return;

  const mock = new MockAdapter(api, { delayResponse: 300, onNoMatch: 'passthrough' });
  registry.forEach((handler) => handler(mock));
};
