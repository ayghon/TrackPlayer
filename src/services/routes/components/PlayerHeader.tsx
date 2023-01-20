import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, Text } from 'native-base';
import { RootStackParamList, Routes } from '../routes.types';
import React from 'react';

export type HeaderTitleProps = {
  children?: string;
  tintColor?: string;
};

const Title = ({ tintColor, children }: HeaderTitleProps) => (
  <Text color={tintColor} variant="body2">
    {children}
  </Text>
);

export type PlayerHeaderProps = HeaderTitleProps & {
  playlistId?: string;
};

export const PlayerHeader = ({
  children,
  tintColor,
  playlistId
}: PlayerHeaderProps) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.PLAYER>>();

  if (!playlistId) {
    return <Title tintColor={tintColor}>{children}</Title>;
  }

  return (
    <Pressable onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlistId })}>
      <Title tintColor={tintColor}>{children}</Title>
    </Pressable>
  );
};
