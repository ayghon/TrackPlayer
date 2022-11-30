import {
  ColorSchemeStorageData,
  ColorSchemeStorageDataItem
} from './color-scheme.types';
import { StorageKeys, getParsedStorageData } from '../storage';
import { ThemeColorScheme } from '../../ui';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createColorScheme = async (data: ColorSchemeStorageDataItem) => {
  const initialData = await getParsedStorageData<ColorSchemeStorageData>(
    StorageKeys.CUSTOM_COLOR_SCHEMES
  );

  let items: ColorSchemeStorageData = [data];
  if (initialData) {
    items = [...initialData, data];
  }

  return await AsyncStorage.setItem(
    StorageKeys.CUSTOM_COLOR_SCHEMES,
    JSON.stringify(items)
  );
};

export const colorSchemeExists = async (name: string) => {
  const parsedData = await getParsedStorageData<ColorSchemeStorageData>(
    StorageKeys.CUSTOM_COLOR_SCHEMES
  );

  const noParsedData = !parsedData || parsedData.length === 0;

  if (noParsedData) {
    return false;
  }

  const customSchemeExists = !!parsedData.find((item) => item.name === name);
  const baseColorSchemeExists = !!Object.values(ThemeColorScheme).find(
    (scheme) => scheme === name
  );

  return !customSchemeExists && !baseColorSchemeExists;
};
