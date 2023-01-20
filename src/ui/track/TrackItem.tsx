import { Image } from '../image';
import { Row, Text, View } from 'native-base';
import { Track } from 'react-native-track-player';
import React, { FC } from 'react';

export type TrackItemProps = Track & {
  active?: boolean;
};

export const TrackItem: FC<TrackItemProps> = ({
  artist,
  title,
  artwork,
  active = false
}) => {
  const textColor = active ? 'text.accent' : 'text.primary';

  return (
    <Row alignItems="center">
      <Image
        height={10}
        source={artwork ? { uri: artwork.toString() } : undefined}
        width={10}
      />
      <View marginLeft={2}>
        <Text color={textColor} variant="body2">
          {title}
        </Text>
        <Text color={textColor} variant="caption">
          {artist}
        </Text>
      </View>
    </Row>
  );
};
