import React, { FC } from 'react';
import { Horizontal } from '../display';
import { Image } from '../image';
import { View } from 'react-native';
import { makeStyles, Text } from '@rneui/themed';
import { Track } from 'react-native-track-player';

export const TrackItem: FC<Track> = ({ artist, title, artwork }) => {
  const styles = useStyles();

  return (
    <Horizontal alignCenter>
      <Image
        source={artwork ? { uri: artwork.toString() } : undefined}
        containerStyle={styles.image}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </Horizontal>
  );
};

const useStyles = makeStyles({
  image: {
    width: 40,
    height: 40,
    marginEnd: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4
  },
  artist: {
    fontSize: 12
  }
});
