import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './ui';
import { PlayerScreen } from './screens';

export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <PlayerScreen />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
