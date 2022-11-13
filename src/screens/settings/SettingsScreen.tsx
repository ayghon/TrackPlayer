import { ScreenContainer } from '../../ui';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, makeStyles, Switch, Text, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { useColorScheme } from '../../services';

export const SettingsScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.SETTINGS>
> = ({ navigation: { navigate } }) => {
  const styles = useStyles();
  const { activeColorSchemeText } = useColorScheme();
  const { theme, updateTheme } = useTheme();
  const isDarkMode = theme.mode === 'dark';

  const toggleDarkMode = () => {
    updateTheme({ mode: isDarkMode ? 'light' : 'dark' });
  };

  return (
    <ScreenContainer>
      <View style={styles.settingsContainer}>
        <View style={styles.setting}>
          <Text style={styles.switchTitle}>Dark mode</Text>
          <Switch
            thumbColor={theme.colors.white}
            color="secondary"
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.switchTitle}>Color scheme</Text>
          <TouchableOpacity
            style={styles.settingAction}
            onPress={() => navigate(Routes.COLOR_SCHEME)}>
            <Text style={styles.settingValue}>{activeColorSchemeText}</Text>
            <Icon name="chevron-right" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  settingsContainer: {},
  settingAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingValue: {
    marginEnd: 4,
    color: theme.colors.secondary
  },
  setting: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  switchTitle: {
    fontWeight: 'bold'
  }
}));
