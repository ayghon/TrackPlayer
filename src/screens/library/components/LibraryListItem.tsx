import { LayoutVariant, PlaylistItem } from '../../../ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Playlist, RootStackParamList, Routes } from '../../../services';
import { StyledProps } from 'native-base';
import React, { FC } from 'react';

export type LibraryListItemProps = StyledProps & {
  item: Playlist;
  variant?: LayoutVariant;
  pinHandler?: (playlist: Playlist) => void;
  deleteHandler?: (playlistId: string) => void;
};

export const LibraryListItem: FC<LibraryListItemProps> = ({
  item,
  variant = LayoutVariant.LIST,
  pinHandler,
  deleteHandler,
  ...rest
}) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParamList, Routes.LIBRARY>>();

  return (
    <PlaylistItem
      artwork={item.artwork}
      onDelete={() => deleteHandler?.(item.id)}
      onPin={() => pinHandler?.(item)}
      onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlistId: item.id })}
      pinned={item.pinned}
      title={item.title}
      trackCount={item.count}
      variant={variant}
      {...rest}
    />
  );
};
