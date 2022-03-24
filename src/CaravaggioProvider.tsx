import React from 'react';

export interface CaravaggioProviderProps {
  /**
   * Url for Caravaggio api. It can be absolute or relative
   * @example
   * Absolute url
   * url="https://caravaggio.vercel.app"
   *
   * Relative url (e.g. on Next.js)
   * url="/api/assets"
   */
  url: string;
  /**
   * Caravaggio can only transform images with absolute urls. If you want to use relative urls,
   * set this value and all the realtive image urls will be considered relative to this baseUrl.
   * Optional, default: undefined
   */
  baseUrl?: string;
}

export type CaravaggioContext = {
  url: string;
  baseUrl?: string;
};

export const CaravaggioContext = React.createContext<CaravaggioContext | null>(
  null,
);

export const CaravaggioProvider: React.FC<CaravaggioProviderProps> = ({
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
