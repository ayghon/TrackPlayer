import { Language } from '../i18n.types';
import { i18nKeys } from '../keys';

export const i18nLanguageKeyToTranslation: Record<string, string> = {
  [Language.EN]: i18nKeys.language.en,
  [Language.FR]: i18nKeys.language.fr
};
