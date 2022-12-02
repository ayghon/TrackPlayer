import { FlatList } from 'react-native';
import { ListRenderItem } from './components/ListRenderItem';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  useColorScheme
} from '../../services';
import { ScreenContainer, ThemeColorScheme, ValueButton } from '../../ui';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export const ColorSchemeModal: FC<
  RootStackScreenProps<Routes.COLOR_SCHEME>
> = ({ navigation: { navigate } }) => {
  const { t } = useTranslation();
  const { colorSchemeList, changeColorScheme, colorScheme } = useColorScheme();

  const handleColorChange = (name: ThemeColorScheme) => {
    const isActive = colorScheme === name;
    if (!isActive) {
      changeColorScheme(name);
    }
  };

  return (
    <ScreenContainer>
      <ValueButton onPress={() => navigate(Routes.COLOR_SCHEME_CREATE)}>
        {t(i18nKeys.modals.color_scheme.button.create_color_scheme)}
      </ValueButton>
      <FlatList
        data={colorSchemeList}
        keyExtractor={({ name }) => name}
        renderItem={({ item: { name, title } }) => (
          <ListRenderItem
            colorScheme={colorScheme}
            handleChange={handleColorChange}
            name={name}
            title={title}
          />
        )}
      />
    </ScreenContainer>
  );
};
