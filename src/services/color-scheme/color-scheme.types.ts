import { ColorSchemePalette } from '../../ui';

export type ColorSchemeModel = {
  [x in ColorSchemePalette]: string;
};

export type ColorSchemeStorageDataItem = {
  name: string;
  palette: ColorSchemeModel;
};

export type ColorSchemeStorageData = ColorSchemeStorageDataItem[];
