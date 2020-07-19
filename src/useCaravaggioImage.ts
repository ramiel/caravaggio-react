import useCaravaggio from './useCaravaggio';
import urlBuilder, { CaravaggioOptions } from './urlBuilder';

const useCaravaggioImage = (
  imageUrl: string,
  opt: CaravaggioOptions,
): string => {
  const context = useCaravaggio();
  return urlBuilder(context, imageUrl, opt);
};

export default useCaravaggioImage;
