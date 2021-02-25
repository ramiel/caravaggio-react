import React from 'react';
import { CaravaggioOptions, urlBuilder } from './urlBuilder';
import { useCaravaggioContext } from './useCaravaggioContext';

export interface ImageSetProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  sets: Array<{
    type?: string;
    rules: { [rule: string]: { opt: CaravaggioOptions; url?: string } };
  }>;
}

export const ImageSet: React.FC<ImageSetProps> = ({ sets, ...otherProps }) => {
  const context = useCaravaggioContext();
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
