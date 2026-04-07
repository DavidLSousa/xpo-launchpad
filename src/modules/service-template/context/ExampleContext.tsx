import React, { createContext, useState, ReactNode } from 'react';
import { exampleService } from '../service/api';
import { ExampleData } from '../types';

interface ExampleContextData {
  data: ExampleData | null;
  isLoading: boolean;
  loadData: () => Promise<void>;
}

export const ExampleContext = createContext<ExampleContextData>({} as ExampleContextData);

export const ExampleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ExampleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await exampleService.fetchData();
      setData(response.data);
      // Aqui entraria persistência local (ex: AsyncStorage.setItem(...))
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExampleContext.Provider value={{ data, isLoading, loadData }}>
      {children}
    </ExampleContext.Provider>
  );
};
