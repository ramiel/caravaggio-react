import { useContext } from 'react';
import { CaravaggioContext } from './CaravaggioProvider';

// This hook expose the Caravaggio url through the context
export const useCaravaggioContext = (): CaravaggioContext => {
  const context = useContext(CaravaggioContext);
  if (!context) {
    throw new Error(
      'The "useCaravaggio" hook can be called only as descendant of CaravaggioProvider',
    );
  }
  return context;
};
