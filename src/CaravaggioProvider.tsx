import React from 'react';

export interface CaravaggioProviderProps {
  url: string;
  baseUrl?: string;
}

export type CaravaggioContext = {
  url: string;
  baseUrl?: string;
};

export const CaravaggioContext = React.createContext<CaravaggioContext | null>(
  null,
);

export const CaravaggioProvider: React.SFC<CaravaggioProviderProps> = ({
  children,
  url,
  baseUrl,
}) => {
  return (
    <CaravaggioContext.Provider value={{ url, baseUrl }}>
      {children}
    </CaravaggioContext.Provider>
  );
};
