import { Horizontal } from '../display';
import { Image } from '../image';
import { Text, makeStyles } from '@rneui/themed';
import { Track } from 'react-native-track-player';
import { View } from 'react-native';
import React, { FC } from 'react';

export const TrackItem: FC<Track> = ({ artist, title, artwork }) => {
  const styles = useStyles();

  return (
    <Horizontal alignCenter>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork.toString() } : undefined}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </Horizontal>
  );
};

const useStyles = makeStyles({
  artist: {
    fontSize: 12
  },
  image: {
    height: 40,
    marginEnd: 8,
    width: 40
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  }
});
