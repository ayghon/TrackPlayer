import { Button, Horizontal, ScreenContainer, ValueButton } from '../../ui';
import {
  RootStackScreenProps,
  Routes,
  StorageKeys,
  i18nKeys,
  i18nLanguageKeyToTranslation,
  useColorScheme
} from '../../services';
import { Text, makeStyles } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC } from 'react';

export const SettingsScreen: FC<RootStackScreenProps<Routes.SETTINGS>> = ({
  navigation: { navigate }
}) => {
  const [t, { language }] = useTranslation();
  const styles = useStyles();
  const { activeColorSchemeText } = useColorScheme();

  const clearCacheHandler = () => {
    AsyncStorage.removeItem(StorageKeys.PLAYLISTS);
    AsyncStorage.removeItem(StorageKeys.CUSTOM_COLOR_SCHEMES);
  };

  return (
    <ScreenContainer>
      <ValueButton
        onPress={() => navigate(Routes.LANGUAGE)}
        value={t(i18nLanguageKeyToTranslation[language])}
      >
        {t(i18nKeys.screens.settings.language.label)}
      </ValueButton>
      <ValueButton
        onPress={() => navigate(Routes.COLOR_SCHEME)}
        value={activeColorSchemeText}
      >
        {t(i18nKeys.screens.settings.color_scheme.label)}
      </ValueButton>
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
  switchTitle: {
    fontWeight: 'bold'
  }
}));
