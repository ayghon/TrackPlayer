import { LayoutVariant, PlaylistItem } from '../../../ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Playlist, RootStackParamList, Routes } from '../../../services';
import React, { FC } from 'react';

export const LibraryListItem: FC<{
  item: Playlist;
  variant?: LayoutVariant;
}> = ({ item, variant = LayoutVariant.LIST }) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.LIBRARY>>();
  // const { removePlaylist } = usePlaylists();

  // FIXME screen is not re-rendered when playlists state is updated with `removePlaylist`

  return (
    <PlaylistItem
      // onDelete={() => removePlaylist(item.id)}
      artwork={item.artwork}
      onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlist: item })}
      title={item.title}
      trackCount={item.count}
      variant={variant}
    />
  );
};
