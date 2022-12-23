import { Box } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';
import React, { FC } from 'react';

export type ColorPaletteItemProps = {
  color: ColorType;
};

export const ColorPaletteItem: FC<ColorPaletteItemProps> = ({ color }) => {
  return (
    <Box
      backgroundColor={color}
      borderColor="white"
      borderRadius="full"
      borderStyle="dotted"
      borderWidth={1}
      height={5}
      margin={0}
      padding={0}
      width={5}
    />
  );
};
