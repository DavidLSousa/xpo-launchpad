import { useContext } from 'react';
import { ExampleContext } from '../context/ExampleContext';

export function useExample() {
  const context = useContext(ExampleContext);

  if (!context) {
    throw new Error('useExample must be used within an ExampleProvider');
  }

  return context;
}
