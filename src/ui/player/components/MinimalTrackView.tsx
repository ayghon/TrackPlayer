import { View } from 'react-native';
import { Icon, makeStyles, Slider, useTheme } from '@rneui/themed';
import React from 'react';
import { TrackViewProps } from '../TrackView';
import { Horizontal } from '../../display';
import { Image } from '../../image';
import { TrackTitle } from './TrackTitle';
import { TrackControlsCapability } from '../controls';

export type MinimalTrackViewProps = Omit<TrackViewProps, 'minimal'>;

export const MinimalTrackView = ({
  controlsProps,
  title = 'Unknown',
  artist = 'Unknown',
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
            minimal
            style={styles.title}
            title={title}
            artist={artist}
          />
        </Horizontal>
        <Icon
          size={32}
          disabledStyle={styles.icon}
          name={isPlaying ? 'play-arrow' : 'pause'}
          disabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
        />
      </Horizontal>
      <Slider
        style={styles.minimalSlider}
        value={position}
        maximumValue={duration}
        minimumValue={0}
        maximumTrackTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.secondary}
        thumbTintColor={theme.colors.secondary}
        thumbTouchSize={{ width: 2, height: 2 }}
        trackStyle={styles.minimalSliderTrack}
        thumbStyle={styles.minimalSliderThumb}
        onSlidingComplete={onProgressChange}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: 40,
    height: 40
  },
  title: {
    backgroundColor: 'green'
  },
  minimalContentContainer: {
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 6,
    justifyContent: 'space-between'
  },
  minimalSliderThumb: {
    height: 2,
    width: 2
  },
  minimalSliderTrack: {
    height: 4
  },
  minimalSlider: {
    height: 6
  },
  icon: {
    backgroundColor: theme.colors.background
  },
  minimalControlsContainer: {
    backgroundColor: theme.colors.white
  }
}));
