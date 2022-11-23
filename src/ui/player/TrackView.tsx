import { Image } from '../image';
import { MinimalTrackView } from './components/MinimalTrackView';
import { TrackControls, TrackControlsProps } from './controls';
import { TrackTitle } from './components/TrackTitle';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React from 'react';

export type TrackViewProps = {
  controlsProps: TrackControlsProps;
  title?: string;
  artist?: string;
  artwork?: string;
  minimal?: boolean;
};

export const TrackView = ({
  controlsProps,
  title = 'Unknown',
  artist = 'Unknown',
  artwork,
  minimal = false
}: TrackViewProps) => {
  const styles = useStyles({ minimal });

  if (minimal) {
    return (
      <MinimalTrackView
        artist={artist}
        artwork={artwork}
        controlsProps={controlsProps}
        title={title}
      />
    );
  }

  return (
    <View>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork } : undefined}
      />
      <TrackTitle artist={artist} style={styles.title} title={title} />
      <TrackControls {...controlsProps} />
    </View>
  );
};

const useStyles = makeStyles({
  image: {
    height: 400,
    marginBottom: 16,
    width: '100%'
  },
  title: {
    marginBottom: 24
  }
});
