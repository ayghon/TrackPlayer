import { StatusBar, useColorMode, useTheme } from 'native-base';
import { ThemeMode } from '../theme';
import React from 'react';

export const ScreenStatusBar = () => {
  const { colorMode } = useColorMode();
  const {
    colors: { primary }
  } = useTheme();
  const isDarkMode = colorMode === ThemeMode.DARK;

  return (
    <StatusBar
      backgroundColor={primary.normal}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
};
