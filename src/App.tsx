import {
  BaseStackNavigation,
  PlayerProvider,
  initI18n,
  useInitPlayer
} from './services';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { useThemeManager } from './ui';
import React from 'react';

initI18n();

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
