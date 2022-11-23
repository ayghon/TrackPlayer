import { ColorSchemeListItem } from './components/ColorSchemeListItem';
import { FlatList } from 'react-native';
import { ScreenContainer, ThemeColorScheme } from '../../ui';
import { useColorScheme } from '../../services';
import React from 'react';

export const ColorSchemeModal = () => {
  const { colorSchemeList, changeColorScheme, colorScheme } = useColorScheme();

  const handleColorChange = (name: ThemeColorScheme) => {
    const isActive = colorScheme === name;
    if (!isActive) {
      changeColorScheme(name);
    }
  };

  return (
    <ScreenContainer>
      <FlatList
        data={colorSchemeList}
        keyExtractor={({ name }) => name}
        renderItem={({ item: { name, title } }) => (
          <ColorSchemeListItem
            checked={colorScheme === name}
            handleChange={handleColorChange}
            name={name}
            title={title}
          />
        )}
      />
    </ScreenContainer>
  );
};
