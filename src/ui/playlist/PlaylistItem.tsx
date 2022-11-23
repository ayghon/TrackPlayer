import { GridPlaylistItem } from './components/GridPlaylistItem';
import { LayoutVariant } from './playlist.types';
import { SwipeablePlaylistItem } from './components/SwipeablePlaylistItem';
import React, { FC } from 'react';

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
        artwork={artwork}
        onDelete={onDelete}
        onPress={onPress}
        onSwipeLeft={onSwipeLeft}
        title={title}
        trackCount={trackCount}
      />
    );
  }

  return (
    <GridPlaylistItem
      artwork={artwork}
      onPress={onPress}
      title={title}
      trackCount={trackCount}
    />
  );
};
