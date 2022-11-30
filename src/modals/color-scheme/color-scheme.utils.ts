import { ColorSchemePalette } from '../../ui';
import { i18nKeys } from '../../services';

export const colorSchemeModelItemToI18n = {
  [ColorSchemePalette.PRIMARY]:
    i18nKeys.modals.color_scheme_create.model_item.primary,
  [ColorSchemePalette.SECONDARY]:
    i18nKeys.modals.color_scheme_create.model_item.secondary,
  [ColorSchemePalette.BACKGROUND]:
    i18nKeys.modals.color_scheme_create.model_item.background,
  [ColorSchemePalette.DARK]:
    i18nKeys.modals.color_scheme_create.model_item.dark,
  [ColorSchemePalette.LIGHT]:
    i18nKeys.modals.color_scheme_create.model_item.light
};
