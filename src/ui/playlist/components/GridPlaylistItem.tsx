import { Card } from '../../display';
import { Image } from '../../image';
import { PlaylistTitleSection } from './PlaylistTitleSection';
import { Pressable, StyledProps } from 'native-base';
import React, { FC } from 'react';

export type GridPlaylistItemProps = StyledProps & {
  onPress?: () => void;
  trackCount: number;
  title: string;
  artwork?: string;
};

export const GridPlaylistItem: FC<GridPlaylistItemProps> = ({
  onPress,
  artwork,
  title,
  trackCount,
  ...rest
}) => {
  return (
    <Pressable height={228} onPress={onPress} width={156} {...rest}>
      <Card height="100%" padding={4}>
        <Image ratio={1} source={artwork ? { uri: artwork } : undefined} />
        <PlaylistTitleSection title={title} trackCount={trackCount} />
      </Card>
    </Pressable>
  );
};
