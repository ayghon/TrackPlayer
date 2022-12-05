import { Horizontal } from '../../display';
import { Image } from '../../image';
import { PlayButton } from '../../button';
import { ProgressBar } from '../controls';
import { TrackControlsCapability } from '../../../services';
import { TrackTitle } from './TrackTitle';
import { TrackViewProps } from '../TrackView';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React from 'react';

export type MinimalTrackViewProps = Omit<
  TrackViewProps,
  'minimal' | 'title' | 'artist'
> & {
  artist: string;
  title: string;
};

export const MinimalTrackView = ({
  controlsProps,
  title,
  artist,
  artwork
}: MinimalTrackViewProps) => {
  const styles = useStyles();

  const { position, onProgressChange, capabilities, isPlaying, duration } =
    controlsProps;

  return (
    <View style={styles.controlsContainer}>
      <Horizontal alignCenter style={styles.contentContainer}>
        <Horizontal>
          <Image
            containerStyle={styles.image}
            source={artwork ? { uri: artwork } : undefined}
          />
          <TrackTitle
            artist={artist}
            minimal
            style={styles.title}
            title={title}
          />
        </Horizontal>
        <PlayButton
          isDisabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          isPlaying={isPlaying}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
        />
      </Horizontal>
      <ProgressBar
        duration={duration}
        minimal
        onProgressChange={onProgressChange}
        position={position}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    justifyContent: 'space-between',
    marginBottom: 6,
    marginHorizontal: 12,
    marginTop: 8
  },
  controlsContainer: {
    backgroundColor: theme.colors.white
  },
  icon: {
    backgroundColor: theme.colors.background
  },
  image: {
    height: 40,
    width: 40
  },
  title: {
    backgroundColor: 'green'
  }
}));
