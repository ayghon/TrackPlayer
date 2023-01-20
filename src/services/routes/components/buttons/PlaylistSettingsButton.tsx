import { Icon } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../routes.types';
import { testIds } from '../../../../utils';
import React, { FC } from 'react';

export type PlaylistSettingsButtonProps = { playlistId: string };

export const PlaylistSettingsButton: FC<PlaylistSettingsButtonProps> = ({
  playlistId
}) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.ROOT>>();

  return (
    <Icon
      accessibilityLabel="settings"
      name="more-vert"
      onPress={() =>
        navigate(Routes.PLAYLIST_SETTINGS, {
          playlistId
        })
      }
      testID={testIds.button.settings}
    />
  );
};
