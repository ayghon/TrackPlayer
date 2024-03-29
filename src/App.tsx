import {
  BaseStackNavigation,
  PlayerProvider,
  StorageEvent,
  useInitI18n
} from './services';
import {
  CustomTheme,
  ScreenStatusBar,
  commonDisplayStyles,
  initialTheme,
  useThemeManager
} from './ui';
import { DeviceEventEmitter } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider, Spinner } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<CustomTheme>(initialTheme);
  useThemeManager();

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      StorageEvent.COLOR_SCHEME_CHANGE,
      setTheme
    );

    return () => listener.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <GestureHandlerRootView style={commonDisplayStyles.flex}>
          <PlayerProvider>{children}</PlayerProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export const App = () => {
  const { isLoading } = useInitI18n();

  if (isLoading) {
    return (
      <Providers>
        <ScreenStatusBar />
        <Spinner />
      </Providers>
    );
  }

  return (
    <Providers>
      <BaseStackNavigation />
    </Providers>
  );
};
