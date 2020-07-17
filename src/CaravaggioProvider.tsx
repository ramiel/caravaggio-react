import React from 'react';

interface CaravaggioProviderProps {
  url: string;
}

export const CaravaggioContext = React.createContext<{
  url: string;
} | null>(null);

const CaravaggioProvider: React.SFC<CaravaggioProviderProps> = ({
  children,
  url,
}) => {
  return (
    <CaravaggioContext.Provider value={{ url }}>{children}</CaravaggioContext.Provider>
  );
};

export default CaravaggioProvider;
