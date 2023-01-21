import { Button, Row, Text } from 'native-base';
import {
  ConfirmDialog,
  ScreenContainer,
  ThemeColorScheme,
  ValueButton,
  useThemeManager
} from '../../ui';
import {
  RootStackScreenProps,
  Routes,
  StorageKeys,
  clearCache,
  i18nKeys,
  i18nLanguageKeyToTranslation,
  useColorScheme
} from '../../services';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC, useCallback, useState } from 'react';

export const SettingsScreen: FC<RootStackScreenProps<Routes.SETTINGS>> = ({
  navigation: { navigate }
}) => {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [t, { language }] = useTranslation();
  const { activeColorSchemeText, changeColorScheme } = useColorScheme();
  const { changeTheme } = useThemeManager();

  // update theme after custom-color scheme update
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(StorageKeys.COLOR_SCHEME).then((colorScheme) => {
        if (colorScheme && colorScheme === ThemeColorScheme.CUSTOM) {
          changeTheme(colorScheme as ThemeColorScheme);
        }
      });
    }, [changeTheme])
  );

  const clearCacheHandler = async () => {
    // if active color scheme is custom, set to default theme before clearing cache
    const colorScheme = await AsyncStorage.getItem(StorageKeys.COLOR_SCHEME);
    if (colorScheme === ThemeColorScheme.CUSTOM) {
      await changeTheme(ThemeColorScheme.DEFAULT);
      changeColorScheme(ThemeColorScheme.DEFAULT);
    }

    await clearCache();
    setConfirmDialogOpen(false);
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
      <Row alignItems="center" justifyContent="space-between">
        <Text variant="body2">
          {t(i18nKeys.screens.settings.clear_cache.label)}
        </Text>
        <Button onPress={() => setConfirmDialogOpen(true)}>
          {t(i18nKeys.screens.settings.clear_cache.button)}
        </Button>
      </Row>
      <ConfirmDialog
        close={() => setConfirmDialogOpen(false)}
        confirmButton={{
          onPress: clearCacheHandler,
          title: t(i18nKeys.button.delete)
        }}
        isOpen={isConfirmDialogOpen}
        title={t(i18nKeys.dialog.irreversible_action.title)}
      >
        <Text variant="body1">
          {t(i18nKeys.screens.settings.dialog.confirm_clear_cache.subtitle)}
        </Text>
      </ConfirmDialog>
    </ScreenContainer>
  );
};
