import React, { FC } from 'react';
import { Playlist, RootStackParamList, Routes } from '../../../services';
import { LayoutVariant, PlaylistItem } from '../../../ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const LibraryListItem: FC<{
  item: Playlist;
  variant?: LayoutVariant;
}> = ({ item, variant = LayoutVariant.LIST }) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.LIBRARY>>();

  return (
    <PlaylistItem
      variant={variant}
      artwork={item.artwork}
      title={item.title}
      trackCount={item.count}
      onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlist: item })}
    />
  );
};
