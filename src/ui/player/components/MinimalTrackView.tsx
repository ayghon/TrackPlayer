import { Horizontal } from '../../display';
import { Icon, Slider, makeStyles, useTheme } from '@rneui/themed';
import { Image } from '../../image';
import { TrackControlsCapability } from '../controls';
import { TrackTitle } from './TrackTitle';
import { TrackViewProps } from '../TrackView';
import { View } from 'react-native';
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
  const { theme } = useTheme();

  const { position, onProgressChange, capabilities, isPlaying, duration } =
    controlsProps;

  return (
    <View style={styles.minimalControlsContainer}>
      <Horizontal alignCenter style={styles.minimalContentContainer}>
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
        <Icon
          disabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          disabledStyle={styles.icon}
          name={isPlaying ? 'play-arrow' : 'pause'}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
          size={32}
        />
      </Horizontal>
      <Slider
        maximumTrackTintColor={theme.colors.primary}
        maximumValue={duration}
        minimumTrackTintColor={theme.colors.secondary}
        minimumValue={0}
        onSlidingComplete={onProgressChange}
        style={styles.minimalSlider}
        thumbStyle={styles.minimalSliderThumb}
        thumbTintColor={theme.colors.secondary}
        thumbTouchSize={{ height: 2, width: 2 }}
        trackStyle={styles.minimalSliderTrack}
        value={position}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.colors.background
  },
  image: {
    height: 40,
    width: 40
  },
  minimalContentContainer: {
    justifyContent: 'space-between',
    marginBottom: 6,
    marginHorizontal: 12,
    marginTop: 8
  },
  minimalControlsContainer: {
    backgroundColor: theme.colors.white
  },
  minimalSlider: {
    height: 6
  },
  minimalSliderThumb: {
    height: 2,
    width: 2
  },
  minimalSliderTrack: {
    height: 4
  },
  title: {
    backgroundColor: 'green'
  }
}));
