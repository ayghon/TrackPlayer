import { ColorSchemeListItem } from './components/ColorSchemeListItem';
import { ColorSchemeStorageData } from '../../services/color-scheme';
import { FlatList } from 'react-native';
import {
  RootStackScreenProps,
  Routes,
  StorageKeys,
  getParsedStorageData,
  useColorScheme
} from '../../services';
import {
  ScreenContainer,
  ThemeColorScheme,
  getColorSchemeConfiguration
} from '../../ui';
import React, { FC, useEffect, useState } from 'react';

export const ColorSchemeModal: FC<
  RootStackScreenProps<Routes.COLOR_SCHEME>
> = () => {
  const [, setCustomColorSchemes] = useState<ColorSchemeStorageData>([]);
  const { colorSchemeList, changeColorScheme, colorScheme } = useColorScheme();

  const handleColorChange = (name: ThemeColorScheme) => {
    const isActive = colorScheme === name;
    if (!isActive) {
      changeColorScheme(name);
    }
  };

  useEffect(() => {
    const getCustomSchemes = async () => {
      const data = await getParsedStorageData<ColorSchemeStorageData>(
        StorageKeys.CUSTOM_COLOR_SCHEMES
      );

      if (data) {
        setCustomColorSchemes(data);
      }
    };

    getCustomSchemes();
  }, []);

  return (
    <ScreenContainer>
      {/*<ValueButton onPress={() => navigate(Routes.COLOR_SCHEME_CREATE)}>*/}
      {/*  {t(i18nKeys.modals.color_scheme.button.create_color_scheme)}*/}
      {/*</ValueButton>*/}
      <FlatList
        data={colorSchemeList}
        keyExtractor={({ name }) => name}
        renderItem={({ item: { name, title } }) => {
          const { palette } = getColorSchemeConfiguration(name);

          return (
            <ColorSchemeListItem
              checked={colorScheme === name}
              colorPalette={palette}
              handleChange={handleColorChange}
              name={name}
              title={title}
            />
          );
        }}
      />
    </ScreenContainer>
  );
};
