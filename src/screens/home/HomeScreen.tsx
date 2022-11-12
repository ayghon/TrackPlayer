import { ScreenContainer } from '../../ui';
import React from 'react';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <Button title="Go to Player" onPress={() => navigate(Routes.PLAYER)} />
    </ScreenContainer>
  );
};
