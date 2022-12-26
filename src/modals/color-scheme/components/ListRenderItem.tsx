import {
  ColorSchemeItem,
  GetColorSchemeConfigurationResponse,
  ThemeColorScheme,
  getColorSchemeConfiguration
} from '../../../ui';
import { ColorSchemeListItem } from './ColorSchemeListItem';
import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useState } from 'react';

export type ListRenderItemProps = ColorSchemeItem & {
  handleChange: (name: ThemeColorScheme) => void;
  colorScheme: ThemeColorScheme;
};

export const ListRenderItem: FC<ListRenderItemProps> = ({
  name,
  title,
  handleChange,
  colorScheme
}) => {
  const [configuration, setConfiguration] =
    useState<GetColorSchemeConfigurationResponse>();

  useEffect(() => {
    getColorSchemeConfiguration(name).then(setConfiguration);
  }, [name]);

  // update custom color-scheme palette on focus
  useFocusEffect(
    useCallback(() => {
      if (name === ThemeColorScheme.CUSTOM) {
        getColorSchemeConfiguration(name).then(setConfiguration);
      }
    }, [name])
  );

  if (!configuration || configuration?.palette.length === 0) {
    return null;
  }

  return (
    <ColorSchemeListItem
      checked={colorScheme === name}
      colorPalette={configuration.palette}
      handleChange={handleChange}
      name={name}
      title={title}
    />
  );
};
