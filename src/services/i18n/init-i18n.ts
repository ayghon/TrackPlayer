import { DEFAULT_LANGUAGE } from './i18n.constants';
import { en, fr } from './locales';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

export const initI18n = () =>
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
      lng: DEFAULT_LANGUAGE,
      resources: {
        en: { translation: en },
        fr: { translation: fr }
      },
      returnNull: false
    });
