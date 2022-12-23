import { AspectRatio, IImageProps, Image as NBImage, View } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import React from 'react';

export type ImageProps = IImageProps & {
  ratio?: ResponsiveValue<number>;
};

export const Image = ({ alt = 'Image', ratio = 1, ...props }: ImageProps) => {
  if (!props?.source) {
    return (
      <AspectRatio height={props.height} ratio={ratio} width={props.width}>
        <View bgColor="primary.light" borderRadius="md" />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio height={props.height} ratio={ratio} width={props.width}>
      <NBImage
        alt={alt}
        bgColor="primary.light"
        borderRadius="md"
        fallbackElement={
          <View bgColor="primary.light" borderRadius="md" {...props} />
        }
        resizeMode="cover"
        {...props}
      />
    </AspectRatio>
  );
};
