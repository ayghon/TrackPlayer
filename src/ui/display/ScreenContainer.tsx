import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { Icon, makeStyles, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

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
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={[styles.container, style]}>
        {hasCloseButton && (
          <Icon
            style={styles.closeButton}
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

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
}));
