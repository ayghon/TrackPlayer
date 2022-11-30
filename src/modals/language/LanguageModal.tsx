import { CheckboxListItem, ScreenContainer } from '../../ui';
import {
  Language,
  StorageKeys,
  i18nLanguageKeyToTranslation
} from '../../services';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const LanguageModal = () => {
  const [t, { language, changeLanguage }] = useTranslation();
  const [checked, setChecked] = useState<Language>(language as Language);

  const handleChange = async (lang: Language) => {
    await changeLanguage(lang);
    await AsyncStorage.setItem(StorageKeys.LANGUAGE, lang);
    setChecked(lang);
  };

  return (
    <ScreenContainer>
      {Object.values(Language).map((lang) => (
        <CheckboxListItem
          bottomDivider
          checked={checked === lang}
          key={lang}
          onPress={() => handleChange(lang)}
          title={t(i18nLanguageKeyToTranslation[lang])}
        />
      ))}
    </ScreenContainer>
  );
};
