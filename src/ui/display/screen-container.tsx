import { StatusBar, View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { makeStyles, useTheme } from '@rneui/themed';

export const ScreenContainer: FC<PropsWithChildren> = ({ children }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const isDarkMode = theme.mode === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {children}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12
  }
}));
