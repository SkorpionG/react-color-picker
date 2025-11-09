import { useContext } from 'react';
import ColorHistoryContext from '../contexts/HistoryContext';

export const useColorHistory = () => {
  const context = useContext(ColorHistoryContext);
  if (!context) {
    throw new Error(
      'useColorHistory must be used within a ColorHistoryProvider'
    );
  }
  return context;
};
