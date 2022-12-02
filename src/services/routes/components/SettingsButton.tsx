import { Horizontal } from '../../../ui';
import { Icon, useTheme } from '@rneui/themed';
import { LibraryHeaderRight } from './LibraryHeaderRight';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import React from 'react';

export const SettingsButton = () => {
  const { theme } = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.ROOT>>();

  return (
    <Horizontal>
      <LibraryHeaderRight />
      <Icon
        color={theme.colors.black}
        name="settings"
        onPress={() => navigate(Routes.SETTINGS)}
      />
    </Horizontal>
  );
};
