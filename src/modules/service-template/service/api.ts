import axios from 'axios';
import { ExampleResponse } from '../types';

// Exemplo de instância do axios centralizada
const api = axios.create({ baseURL: 'https://api.example.com' });

export const exampleService = {
  fetchData: async (): Promise<ExampleResponse> => {
    try {
      const response = await api.get('/endpoint');
      return response.data;
    } catch (error) {
       // Mapeamento de erro
      throw new Error('Falha ao buscar dados');
    }
  },
  
  submitData: async (payload: any): Promise<void> => {
    try {
      await api.post('/endpoint', payload);
    } catch (error) {
      throw new Error('Falha ao enviar dados');
    }
  }
};
