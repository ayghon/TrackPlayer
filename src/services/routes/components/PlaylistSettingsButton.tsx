import { Icon } from '@rneui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Playlist } from '../../playlists';
import { RootStackParamList, Routes } from '../routes.types';
import React, { FC } from 'react';

export type PlaylistSettingsButtonProps = { playlist: Playlist };

export const PlaylistSettingsButton: FC<PlaylistSettingsButtonProps> = ({
  playlist
}) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.ROOT>>();

  return (
    <Icon
      name="more-vert"
      onPress={() =>
        navigate(Routes.PLAYLIST_SETTINGS, {
          playlist
        })
      }
    />
  );
};
