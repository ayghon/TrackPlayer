import { DEFAULT_LANGUAGE } from './i18n.constants';
import { StorageKeys } from '../../utils';
import { en, fr } from './locales';
import { initReactI18next } from 'react-i18next';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

export const useInitI18n = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const storageLanguage = await AsyncStorage.getItem(StorageKeys.LANGUAGE);

      await i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
          compatibilityJSON: 'v3',
          interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
          },
          lng: storageLanguage || DEFAULT_LANGUAGE,
          resources: {
            en: { translation: en },
            fr: { translation: fr }
          },
          returnNull: false
        });
      setLoading(false);
    };

    init();
  }, []);

  return { isLoading };
};
