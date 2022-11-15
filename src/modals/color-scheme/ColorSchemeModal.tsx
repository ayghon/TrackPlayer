import React from 'react';
import { ModalContainer } from '../../ui';
import { View } from 'react-native';
import { useColorScheme } from '../../services';
import { ColorSchemeListItem } from './components/ColorSchemeListItem';
import { ThemeColorScheme } from '../../ui/theme/theme.types';

export const ColorSchemeModal = () => {
  const { colorSchemeList, changeColorScheme, colorScheme } = useColorScheme();

  const handleColorChange = (name: ThemeColorScheme) => {
    const isActive = colorScheme === name;
    if (!isActive) {
      changeColorScheme(name);
    }
  };

  return (
    <ModalContainer>
      <View>
        {colorSchemeList.map(({ name, title }) => (
          <ColorSchemeListItem
            checked={colorScheme === name}
            handleChange={handleColorChange}
            name={name}
            title={title}
            key={name}
          />
        ))}
      </View>
    </ModalContainer>
  );
};
