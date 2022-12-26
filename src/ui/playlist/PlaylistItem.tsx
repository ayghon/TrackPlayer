import { GridPlaylistItem } from './components/GridPlaylistItem';
import { LayoutVariant } from './playlist.types';
import { StyledProps } from 'native-base';
import { SwipeablePlaylistItem } from './components/SwipeablePlaylistItem';
import React, { FC } from 'react';

export type PlaylistItemProps = StyledProps & {
  trackCount: number;
  title: string;
  artwork?: string;
  onPress?: () => void;
  variant?: LayoutVariant;
  onDelete?: () => void;
  onPin?: () => void;
  pinned?: boolean;
};

export const PlaylistItem: FC<PlaylistItemProps> = ({
  trackCount,
  title,
  artwork,
  onPress,
  variant = LayoutVariant.LIST,
  onDelete,
  onPin,
  pinned,
  ...rest
}) => {
  if (variant === LayoutVariant.LIST) {
    return (
      <SwipeablePlaylistItem
        artwork={artwork}
        onDelete={onDelete}
        onPin={onPin}
        onPress={onPress}
        pinned={pinned}
        title={title}
        trackCount={trackCount}
        {...rest}
      />
    );
  }

  return (
    <GridPlaylistItem
      artwork={artwork}
      onPress={onPress}
      title={title}
      trackCount={trackCount}
      {...rest}
    />
  );
};
