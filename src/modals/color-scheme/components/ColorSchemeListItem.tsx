import { ListItem, makeStyles, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import React, { FC } from 'react';
import { ColorPaletteItem } from './ColorPaletteItem';
import { getColorSchemeConfiguration, ThemeColorScheme } from '../../../ui';

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
        checkedColor={theme.colors.secondary}
        uncheckedColor={theme.colors.black}
        checked={checked}
        onPress={() => handleChange(name)}
      />
    </ListItem>
  );
};

const useStyles = makeStyles({
  palette: { display: 'flex', flexDirection: 'row' }
});
