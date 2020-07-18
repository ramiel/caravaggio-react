import React from 'react';
import urlBuilder, { CaravaggioOptions } from './urlBuilder';
import useCaravaggio from './useCaravaggio';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  sets: [
    {
      type?: string;
      rules: { [rule: string]: { opt: CaravaggioOptions; url?: string } };
    },
  ];
}

const ImageSet: React.SFC<ImageProps> = ({ sets, ...otherProps }) => {
  const caravaggioUrl = useCaravaggio();
  const sources = sets.map((set) => {
    const srcSet = Object.entries(set.rules)
      .map(([rule, { opt, url }]) => {
        console.log('->', opt)
        return `${urlBuilder(
          caravaggioUrl,
          url || (otherProps.src as string),
          opt,
        )} ${rule}`;
      })
      .join(',');
    return <source type={set.type} srcSet={srcSet} />;
  });
  return (
    <picture>
      {sources}
      <img {...otherProps} />
    </picture>
  );
};

export default ImageSet;
