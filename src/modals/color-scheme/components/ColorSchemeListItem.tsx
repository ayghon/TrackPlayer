import {
  CheckboxListItem,
  ColorSchemeConfigurationPalette,
  ThemeColorScheme
} from '../../../ui';
import { ColorPaletteItem } from './ColorPaletteItem';
import { Row } from 'native-base';
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
      checkedColor={themeColorSecondary}
      onPress={() =>
        // force component update by passing changing palette color
        // for custom color-scheme
        handleChange(name)
      }
      rightContent={
        <Row alignItems="center">
          {colorPalette.map((color) =>
            color ? <ColorPaletteItem color={color} key={color} /> : null
          )}
        </Row>
      }
      title={title}
      value={title}
    />
  );
};
