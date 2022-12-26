import { ColorSchemeStorageData } from './color-scheme.types';
import { StorageKeys } from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createColorScheme = (data: ColorSchemeStorageData) =>
  AsyncStorage.setItem(StorageKeys.CUSTOM_COLOR_SCHEMES, JSON.stringify(data));

// TODO uncomment when multiple custom color schemes creation is implemented
// export const colorSchemeExists = async (name: string) => {
//   const parsedData = await getParsedStorageData<ColorSchemeStorageData>(
//     StorageKeys.CUSTOM_COLOR_SCHEMES
//   );
//
//   const noParsedData = !parsedData || parsedData.length === 0;
//
//   if (noParsedData) {
//     return false;
//   }
//
//   const customSchemeExists = !!parsedData.find((item) => item.name === name);
//   const baseColorSchemeExists = !!Object.values(ThemeColorScheme).find(
//     (scheme) => scheme === name
//   );
//
//   return !customSchemeExists && !baseColorSchemeExists;
// };
