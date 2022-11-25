import {
  CheckboxListItem,
  Horizontal,
  ThemeColorScheme,
  getColorSchemeConfiguration
} from '../../../ui';
import { ColorPaletteItem } from './ColorPaletteItem';
import React, { FC } from 'react';

export type ColorSchemeListItemProps = {
  title: string;
  name: ThemeColorScheme;
  handleChange: (name: ThemeColorScheme) => void;
  checked: boolean;
};

export const ColorSchemeListItem: FC<ColorSchemeListItemProps> = ({
  title,
  name,
  handleChange,
  checked
}) => {
  const { palette: colorPalette } = getColorSchemeConfiguration(name);

  return (
    <CheckboxListItem
      bottomDivider
      checked={checked}
      onPress={() => handleChange(name)}
      rightContent={
        <Horizontal>
          {colorPalette.map((color) =>
            color ? <ColorPaletteItem color={color} key={color} /> : null
          )}
        </Horizontal>
      }
      title={title}
    />
  );
};
