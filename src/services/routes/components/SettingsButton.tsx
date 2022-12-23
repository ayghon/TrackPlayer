import { Icon, Row } from 'native-base';
import { LibraryHeaderRight } from './LibraryHeaderRight';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import React from 'react';

export const SettingsButton = () => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.ROOT>>();

  return (
    <Row space={4}>
      <LibraryHeaderRight />
      <Icon name="settings" onPress={() => navigate(Routes.SETTINGS)} />
    </Row>
  );
};
