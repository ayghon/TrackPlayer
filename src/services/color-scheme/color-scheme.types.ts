import { ColorSchemePalette, ThemeMode } from '../../ui';

export type ColorSchemeModel = {
  [x in ColorSchemePalette]: string;
};

export type ColorSchemeStorageData = {
  mode: ThemeMode;
  palette: ColorSchemeModel;
};
