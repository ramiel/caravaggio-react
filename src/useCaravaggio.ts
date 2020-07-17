import { useContext } from 'react';
import { CaravaggioContext } from './CaravaggioProvider';

// This hook expose the Caravaggio url through the context
const useCaravaggio = () => {
  const context = useContext(CaravaggioContext);
  if (!context) {
    throw new Error(
      'The "useCaravaggio" hook can be called only as descendant of CaravaggioProvider',
    );
  }
  return context.url;
};

export default useCaravaggio;
