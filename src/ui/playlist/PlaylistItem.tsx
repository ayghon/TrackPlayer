import React, { FC } from 'react';
import { LayoutVariant } from './playlist.types';
import { SwipeablePlaylistItem } from './components/SwipeablePlaylistItem';
import { GridPlaylistItem } from './components/GridPlaylistItem';

export type PlaylistItemProps = {
  trackCount: number;
  title: string;
  artwork?: string;
  onPress?: () => void;
  variant?: LayoutVariant;
  onDelete?: () => void;
  onSwipeLeft?: () => void;
};

export const PlaylistItem: FC<PlaylistItemProps> = ({
  trackCount,
  title,
  artwork,
  onPress,
  variant = LayoutVariant.LIST,
  onDelete,
  onSwipeLeft
}) => {
  if (variant === LayoutVariant.LIST) {
    return (
      <SwipeablePlaylistItem
        onPress={onPress}
        trackCount={trackCount}
        title={title}
        onDelete={onDelete}
        artwork={artwork}
        onSwipeLeft={onSwipeLeft}
      />
    );
  }

  return (
    <GridPlaylistItem
      title={title}
      trackCount={trackCount}
      artwork={artwork}
      onPress={onPress}
    />
  );
};
