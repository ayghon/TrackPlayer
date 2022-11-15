import React from 'react';
import { ScreenContainer, ThemeColorScheme } from '../../ui';
import { FlatList } from 'react-native';
import { useColorScheme } from '../../services';
import { ColorSchemeListItem } from './components/ColorSchemeListItem';

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
        renderItem={({ item: { name, title } }) => (
          <ColorSchemeListItem
            checked={colorScheme === name}
            handleChange={handleColorChange}
            name={name}
            title={title}
          />
        )}
        keyExtractor={({ name }) => name}
      />
    </ScreenContainer>
  );
};
