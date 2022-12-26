import { Icon } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import React from 'react';

export const LibraryHeaderRight = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return <Icon name="add" onPress={() => navigate(Routes.PLAYLIST_CREATE)} />;
};
