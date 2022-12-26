import { LayoutVariant, PlaylistItem } from '../../../ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Playlist, RootStackParamList, Routes } from '../../../services';
import React, { FC } from 'react';

export const LibraryListItem: FC<{
  item: Playlist;
  variant?: LayoutVariant;
  pinHandler?: (playlist: Playlist) => void;
  deleteHandler?: (playlistId: string) => void;
}> = ({ item, variant = LayoutVariant.LIST, pinHandler, deleteHandler }) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.LIBRARY>>();

  return (
    <PlaylistItem
      artwork={item.artwork}
      onDelete={() => deleteHandler?.(item.id)}
      onPin={() => pinHandler?.(item)}
      onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlist: item })}
      pinned={item.pinned}
      title={item.title}
      trackCount={item.count}
      variant={variant}
    />
  );
};
