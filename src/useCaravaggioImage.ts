import useCaravaggio from './useCaravaggio';
import urlBuilder, { CaravaggioOptions } from './urlBuilder';


const useCaravaggioImage = (imageUrl: string, opt: CaravaggioOptions) => {
  const url = useCaravaggio();
  return urlBuilder(url, imageUrl, opt);
};

export default useCaravaggioImage;
