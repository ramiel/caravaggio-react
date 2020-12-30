import React from 'react';
import { useCaravaggioImage } from './useCaravaggioImage';
import { CaravaggioOptions } from './urlBuilder';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  opt?: CaravaggioOptions;
}

export const Image: React.FC<ImageProps> = ({ opt, src, ...otherProps }) => {
  const url = useCaravaggioImage(src as string, opt);
  return <img src={url} {...otherProps} />;
};
