import { ColorPaletteItem } from './ColorPaletteItem';
import { ListItem, makeStyles, useTheme } from '@rneui/themed';
import { ThemeColorScheme, getColorSchemeConfiguration } from '../../../ui';
import { View } from 'react-native';
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
  const { theme } = useTheme();
  const styles = useStyles();

  const { palette: colorPalette } = getColorSchemeConfiguration(name);

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <View style={styles.palette}>
        {colorPalette.map((color) =>
          color ? <ColorPaletteItem color={color} key={color} /> : null
        )}
      </View>
      <ListItem.CheckBox
        checked={checked}
        checkedColor={theme.colors.secondary}
        onPress={() => handleChange(name)}
        uncheckedColor={theme.colors.black}
      />
    </ListItem>
  );
};

const useStyles = makeStyles({
  palette: { display: 'flex', flexDirection: 'row' }
});
