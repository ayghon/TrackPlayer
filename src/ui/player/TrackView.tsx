import { View } from 'react-native';
import { TrackControls, TrackControlsProps } from './TrackControls';
import React from 'react';
import { makeStyles } from '@rneui/themed';
import { TrackTitle } from './components/TrackTitle';
import { Image } from '../image';

export type TrackViewProps = {
  controlsProps: TrackControlsProps;
  title?: string;
  artist?: string;
  artwork?: string;
};

export const TrackView = ({
  controlsProps,
  title = 'Unknown',
  artist = 'Unknown',
  artwork
}: TrackViewProps) => {
  const styles = useStyles();

  return (
    <View>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork } : undefined}
      />
      <TrackTitle style={styles.title} title={title} artist={artist} />
      <TrackControls {...controlsProps} />
    </View>
  );
};

const useStyles = makeStyles({
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16
  },
  title: {
    marginBottom: 24
  }
});
