import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './ui';
import { BaseStackNavigation } from './services';

export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <BaseStackNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
