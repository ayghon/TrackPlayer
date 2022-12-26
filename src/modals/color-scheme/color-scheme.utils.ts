import { ColorSchemePalette } from '../../ui';
import { i18nKeys } from '../../services';

export const colorSchemeModelItemToI18n: Record<ColorSchemePalette, string> = {
  [ColorSchemePalette.PRIMARY_OPAQUE]:
    i18nKeys.modals.color_scheme_create.model_item.primary.opaque,
  [ColorSchemePalette.PRIMARY_DARK]:
    i18nKeys.modals.color_scheme_create.model_item.primary.dark,
  [ColorSchemePalette.PRIMARY_LIGHT]:
    i18nKeys.modals.color_scheme_create.model_item.primary.light,
  [ColorSchemePalette.PRIMARY_NORMAL]:
    i18nKeys.modals.color_scheme_create.model_item.primary.normal,
  [ColorSchemePalette.SECONDARY_LIGHT]:
    i18nKeys.modals.color_scheme_create.model_item.secondary.light,
  [ColorSchemePalette.SECONDARY_NORMAL]:
    i18nKeys.modals.color_scheme_create.model_item.secondary.normal,
  [ColorSchemePalette.SECONDARY_DARK]:
    i18nKeys.modals.color_scheme_create.model_item.secondary.dark
};
