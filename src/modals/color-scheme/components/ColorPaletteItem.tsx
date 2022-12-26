import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React, { FC } from 'react';

export const ColorPaletteItem: FC<{ color: string }> = ({ color }) => {
  const styles = useStyles();
  return (
    <View
      key={color}
      style={[styles.paletteColor, { backgroundColor: color }]}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  paletteColor: {
    borderColor: theme.colors.black,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    height: 20,
    margin: 0,
    padding: 0,
    width: 20
  }
}));
