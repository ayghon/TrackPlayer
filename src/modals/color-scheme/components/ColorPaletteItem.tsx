import React, { FC } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

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
    width: 20,
    padding: 0,
    margin: 0,
    height: 20,
    borderRadius: 100,
    borderColor: theme.colors.white,
    borderStyle: 'solid',
    borderWidth: 2
  }
}));
