import React from 'react';
import urlBuilder, { CaravaggioOptions } from './urlBuilder';
import useCaravaggio from './useCaravaggio';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  sets: Array<{
    type?: string;
    rules: { [rule: string]: { opt: CaravaggioOptions; url?: string } };
  }>;
}

const ImageSet: React.SFC<ImageProps> = ({ sets, ...otherProps }) => {
  const context = useCaravaggio();
  const sources = sets.map((set, i) => {
    const srcSet = Object.entries(set.rules)
      .map(([rule, { opt, url }]) => {
        return `${urlBuilder(
          context,
          url || (otherProps.src as string),
          opt,
        )} ${rule}`;
      })
      .join(',');
    return (
      <source
        type={set.type}
        srcSet={srcSet}
        key={`${otherProps.src}-set-${i}`}
      />
    );
  });
  return (
    <picture>
      {sources}
      <img {...otherProps} />
    </picture>
  );
};

export default ImageSet;
