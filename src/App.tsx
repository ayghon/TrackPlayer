import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { useThemeManager } from './ui';
import { BaseStackNavigation, useInitPlayer } from './services';

export const App = () => {
  useInitPlayer();
  const { theme } = useThemeManager();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <BaseStackNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
