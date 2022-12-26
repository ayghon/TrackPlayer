import { Icon, makeStyles, useTheme } from '@rneui/themed';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

export type ScreenContainerProps = {
  hasCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
  onClose?: () => void;
};

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = ({
  children,
  hasCloseButton = false,
  style,
  onClose
}) => {
  const { goBack } = useNavigation();
  const styles = useStyles();
  const { theme } = useTheme();
  const isDarkMode = theme.mode === 'dark';

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.container, style]}>
        {hasCloseButton && (
          <Icon
            name="close"
            onPress={() => {
              if (onClose) {
                onClose();
              }
              goBack();
            }}
            style={styles.closeButton}
          />
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    alignSelf: 'flex-end'
  },
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16
  }
}));
