import { Icon, StatusBar, View, useColorMode, useTheme } from 'native-base';
import { SafeAreaView } from 'react-native';
import { ThemeMode } from '../theme';
import { useNavigation } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

export type ScreenContainerProps = {
  hasCloseButton?: boolean;
  onClose?: () => void;
};

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = ({
  children,
  hasCloseButton = false,
  onClose
}) => {
  const { goBack } = useNavigation();
  const { colorMode } = useColorMode();
  const {
    colors: { primary }
  } = useTheme();
  const isDarkMode = colorMode === ThemeMode.DARK;

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={primary.normal}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View height="100%" paddingX={4} paddingY={3}>
        {hasCloseButton && (
          <Icon
            alignSelf="flex-end"
            name="close"
            onPress={() => {
              if (onClose) {
                onClose();
              }
              goBack();
            }}
          />
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};
