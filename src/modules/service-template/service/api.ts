import axios from 'axios';
import { ExampleResponse } from '../types';

// Centralized Axios instance example
const api = axios.create({ baseURL: 'https://api.example.com' });

export const exampleService = {
  fetchData: async (): Promise<ExampleResponse> => {
    try {
      const response = await api.get('/endpoint');
      return response.data;
    } catch (error) {
      // Error mapping
      throw new Error('Failed to fetch data');
    }
  },

  submitData: async (payload: any): Promise<void> => {
    try {
      await api.post('/endpoint', payload);
    } catch (error) {
      throw new Error('Failed to submit data');
    }
  },
};
