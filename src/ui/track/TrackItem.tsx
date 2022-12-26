import { Image } from '../image';
import { Row, Text, View } from 'native-base';
import { Track } from 'react-native-track-player';
import React, { FC } from 'react';

export const TrackItem: FC<Track> = ({ artist, title, artwork }) => {
  return (
    <Row alignItems="center">
      <Image
        height={10}
        source={artwork ? { uri: artwork.toString() } : undefined}
        width={10}
      />
      <View marginLeft={2}>
        <Text variant="body2">{title}</Text>
        <Text variant="caption">{artist}</Text>
      </View>
    </Row>
  );
};
