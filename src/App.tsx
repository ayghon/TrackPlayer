import { ActivityIndicator, StyleSheet } from 'react-native';
import { BaseStackNavigation, PlayerProvider, useInitI18n } from './services';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { useThemeManager } from './ui';
import React from 'react';

export const App = () => {
  const { isLoading } = useInitI18n();
  const { theme } = useThemeManager();

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

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
  loader: {
    height: '100%',
    width: '100%'
  },
  rootView: { flex: 1 }
});
