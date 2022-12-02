import {
  CheckboxListItem,
  ColorSchemeConfigurationPalette,
  Horizontal,
  ThemeColorScheme
} from '../../../ui';
import { ColorPaletteItem } from './ColorPaletteItem';
import React, { FC } from 'react';

export type ColorSchemeListItemProps = {
  title: string;
  name: ThemeColorScheme;
  handleChange: (name: ThemeColorScheme) => void;
  checked: boolean;
  colorPalette: ColorSchemeConfigurationPalette;
};

export const ColorSchemeListItem: FC<ColorSchemeListItemProps> = ({
  title,
  name,
  handleChange,
  checked,
  colorPalette
}) => {
  const [, themeColorSecondary] = colorPalette;

  return (
    <CheckboxListItem
      bottomDivider
      checked={checked}
      // force component update by passing changing palette color
      // for custom color-scheme
      checkedColor={themeColorSecondary}
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
