import { useCaravaggioContext } from './useCaravaggioContext';
import { CaravaggioOptions, urlBuilder } from './urlBuilder';
import { useContext } from 'react';
import { CaravaggioContext } from './CaravaggioProvider';

/**
 * Given an image, return the url with the transofmrations applied
 * @param imageUrl The image to tranform
 * @param opt Caravaggio options. @see https://caravaggio.ramielcreations.com/
 */
export const useCaravaggio = (
  imageUrl?: string,
  opt?: CaravaggioOptions,
): string | undefined => {
  const context = useCaravaggioContext();
  if(!imageUrl) return undefined;
  return urlBuilder(context, imageUrl, opt);
};

/**
 * Given an image, return the url with the transofmrations applied
 * @param imageUrl The image to tranform
 * @param opt Caravaggio options. @see https://caravaggio.ramielcreations.com/
 */
export const useCaravaggioImage = (
  imageUrl: string,
  opt?: CaravaggioOptions,
): string | undefined => {
  console.warn(
    '@deprecated "useCaravaggioImage" is deprecated, its name changed to "useCaravaggio"',
  );
  return useCaravaggio(imageUrl, opt);
};

/**
 * Same as useCaravaggio but return the original image if there's no context
 * or no image
 * @param imageUrl The optional image url
 * @param opt The options
 */
export const useCaravaggioIfAvailable = (
  imageUrl?: string | null,
  opt?: CaravaggioOptions,
): string | null | undefined => {
  const context = useContext(CaravaggioContext);
  if (!context || !imageUrl) {
    return imageUrl;
  }
  return urlBuilder(context, imageUrl, opt);
};

type CaravaggioBuilder = (imageUrl: string, opt?: CaravaggioOptions) => string;
/**
 * Return a function that you can use to get transformed image urls
 */
export const useCaravaggioBuilder = (): CaravaggioBuilder => {
  const context = useCaravaggioContext();
  const builder: CaravaggioBuilder = (imageUrl, opt) => {
    return urlBuilder(context, imageUrl, opt);
  };
  return builder;
};
