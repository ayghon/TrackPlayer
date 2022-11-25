import { Button, Horizontal, ScreenContainer } from '../../ui';
import { Icon, Text, makeStyles } from '@rneui/themed';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  useColorScheme
} from '../../services';
import { StorageKeys } from '../../utils';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC } from 'react';

export const SettingsScreen: FC<RootStackScreenProps<Routes.SETTINGS>> = ({
  navigation: { navigate }
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { activeColorSchemeText } = useColorScheme();

  const clearCacheHandler = () => {
    AsyncStorage.removeItem(StorageKeys.PLAYLISTS);
    AsyncStorage.removeItem(StorageKeys.COLOR_SCHEME);
  };

  return (
    <ScreenContainer>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>
          {t(i18nKeys.screens.settings.color_scheme.label)}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(Routes.COLOR_SCHEME)}
          style={styles.settingAction}
        >
          <Text style={styles.settingValue}>{activeColorSchemeText}</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      </Horizontal>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>
          {t(i18nKeys.screens.settings.clear_cache.label)}
        </Text>
        <Button onPress={clearCacheHandler}>
          {t(i18nKeys.screens.settings.clear_cache.button)}
        </Button>
      </Horizontal>
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  setting: {
    justifyContent: 'space-between',
    marginBottom: 32
  },
  settingAction: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  settingValue: {
    color: theme.colors.secondary,
    marginEnd: 4
  },
  switchTitle: {
    fontWeight: 'bold'
  }
}));
