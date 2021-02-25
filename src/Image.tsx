import React from 'react';
import { useCaravaggio } from './useCaravaggio';
import { CaravaggioOptions } from './urlBuilder';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  opt?: CaravaggioOptions;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ opt, src, ...otherProps }, ref) => {
    const url = useCaravaggio(src as string, opt);
    return <img src={url} {...otherProps} ref={ref} />;
  },
);

Image.displayName = 'Image';
