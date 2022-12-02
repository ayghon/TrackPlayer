import { Icon } from '@rneui/themed';
import { isAndroid } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const IOSCloseButton = () => {
  const { goBack } = useNavigation();

  if (isAndroid) {
    return null;
  }

  return <Icon name="close" onPress={goBack} />;
};
