import { Center, Pressable } from 'native-base';
import { Image } from '../../../ui';
import React, { FC } from 'react';

export type PlaylistArtworkProps = {
  onPress: () => void;
  artwork?: string;
};

export const PlaylistArtwork: FC<PlaylistArtworkProps> = ({
  onPress,
  artwork
}) => {
  return (
    <Center>
      <Pressable marginY={4} onPress={onPress}>
        <Image
          height={200}
          source={artwork ? { uri: artwork } : undefined}
          width={200}
        />
      </Pressable>
    </Center>
  );
};
