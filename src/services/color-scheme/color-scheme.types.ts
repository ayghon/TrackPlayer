import { ColorSchemePalette } from '../../ui';
import { ThemeMode } from '@rneui/themed';

export type ColorSchemeModel = {
  [x in ColorSchemePalette]: string;
};

export type ColorSchemeStorageData = {
  mode: ThemeMode;
  palette: ColorSchemeModel;
};
