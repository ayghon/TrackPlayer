import { AddPlaylistButton } from './AddPlaylistButton';
import { Icon, Row } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import { testIds } from '../../../utils';
import React from 'react';

export const SettingsButton = () => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.ROOT>>();

  return (
    <Row space={4}>
      <AddPlaylistButton />
      <Icon
        accessibilityLabel="settings"
        name="settings"
        onPress={() => navigate(Routes.SETTINGS)}
        testID={testIds.button.settings}
      />
    </Row>
  );
};
