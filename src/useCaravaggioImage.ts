import useCaravaggio from './useCaravaggio';
import { CaravaggioOptions, urlBuilder } from './urlBuilder';

export const useCaravaggioImage = (
  imageUrl: string,
  opt?: CaravaggioOptions,
): string => {
  const context = useCaravaggio();
  return urlBuilder(context, imageUrl, opt);
};
