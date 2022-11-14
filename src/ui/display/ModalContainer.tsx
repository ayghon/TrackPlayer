import { SafeAreaView, StatusBar, View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon, makeStyles, useTheme } from '@rneui/themed';

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
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
      <View style={styles.container}>
        <Icon
          style={styles.closeButton}
          name="close"
          onPress={() => goBack()}
        />
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
