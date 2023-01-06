import { Icon } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import { testIds } from '../../../utils';
import React from 'react';

export const AddPlaylistButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Icon
      accessibilityLabel="add playlist"
      name="add"
      onPress={() => navigate(Routes.PLAYLIST_CREATE)}
      testID={testIds.button.add_playlist}
    />
  );
};
