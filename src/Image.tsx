import React from 'react';
import useCaravaggioImage from './useCaravaggioImage';
import { CaravaggioOptions } from './urlBuilder';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  opt?: CaravaggioOptions;
}

const Image: React.FC<ImageProps> = ({ opt, src, ...otherProps }) => {
  const url = useCaravaggioImage(src as string, opt);
  return <img src={url} {...otherProps} />;
};

export default React.memo(Image);
