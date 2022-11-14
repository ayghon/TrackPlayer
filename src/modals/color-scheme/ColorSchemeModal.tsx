import React from 'react';
import { ModalContainer } from '../../ui';
import { View } from 'react-native';
import { ColorSchemeSetting, useColorScheme } from '../../services';
import { ColorSchemeListItem } from './components/ColorSchemeListItem';

export const ColorSchemeModal = () => {
  const { colorSchemeList, changeColorScheme, colorScheme } = useColorScheme();

  const handleColorChange = (name: ColorSchemeSetting) => {
    const isActive = colorScheme === name;
    if (!isActive) {
      changeColorScheme(
        name === ColorSchemeSetting.DEFAULT_DARK
          ? ColorSchemeSetting.DEFAULT_DARK
          : ColorSchemeSetting.DEFAULT_LIGHT
      );
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
