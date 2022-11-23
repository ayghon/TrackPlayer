import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { useThemeManager } from './ui';
import { BaseStackNavigation, PlayerProvider, useInitPlayer } from './services';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const App = () => {
  useInitPlayer();
  const { theme } = useThemeManager();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={styles.rootView}>
          <PlayerProvider>
            <BaseStackNavigation />
          </PlayerProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootView: { flex: 1 }
});
