import { StorageKeys } from './storage.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description Get parsed data from AsyncStorage
 * @param key StorageKey for AsyncStorage
 */
export async function getParsedStorageData<
  TStorageData = Record<string, unknown>
>(key: StorageKeys): Promise<TStorageData | null> {
  const rawData = await AsyncStorage.getItem(key);

  try {
    if (rawData && rawData.length > 0) {
      return JSON.parse(rawData);
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const clearCache = () =>
  AsyncStorage.multiRemove([
    StorageKeys.CUSTOM_COLOR_SCHEMES,
    StorageKeys.COLOR_SCHEME,
    StorageKeys.PLAYLISTS,
    StorageKeys.RECENTLY_PLAYED
  ]);
