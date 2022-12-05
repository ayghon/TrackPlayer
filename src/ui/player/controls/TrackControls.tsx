import { Horizontal } from '../../display';
import { Icon, makeStyles } from '@rneui/themed';
import { ProgressBar } from './ProgressBar';
import { RepeatMode } from 'react-native-track-player';
import { RepeatModeButton } from './RepeatModeButton';
import { ShuffleModeButton } from './ShuffleModeButton';
import {
  TrackControlsCapability,
  TrackControls as TrackControlsProps
} from '../../../services';
import { View } from 'react-native';
import React from 'react';

export const TrackControls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities,
  repeatMode = RepeatMode.Off,
  changeRepeatMode,
  toggleShuffle,
  shuffle = false
}: TrackControlsProps) => {
  const styles = useStyles();

  const icons = [
    {
      capability: TrackControlsCapability.SKIP_TO_PREVIOUS,
      containerStyle: styles.outerIconStart,
      name: 'skip-previous'
    },
    {
      capability: TrackControlsCapability.JUMP_BACKWARD,
      containerStyle: styles.innerIconStart,
      name: 'fast-rewind'
    },
    {
      capability: TrackControlsCapability.PLAY_PAUSE,
      name: isPlaying ? 'play-arrow' : 'pause'
    },
    {
      capability: TrackControlsCapability.JUMP_FORWARD,
      containerStyle: styles.innerIconEnd,
      name: 'fast-forward'
    },
    {
      capability: TrackControlsCapability.SKIP_TO_NEXT,
      containerStyle: styles.outerIconEnd,
      name: 'skip-next'
    }
  ];

  return (
    <View>
      <ProgressBar
        duration={duration}
        onProgressChange={onProgressChange}
        position={position}
      />
      <Horizontal alignCenter style={styles.container}>
        {icons.map(({ capability, containerStyle, name }) => {
          return (
            <Icon
              containerStyle={containerStyle}
              disabled={capabilities[capability].disabled}
              disabledStyle={styles.icon}
              key={capability}
              name={name}
              onPress={capabilities[capability].onPress}
              size={56}
            />
          );
        })}
      </Horizontal>
      {(toggleShuffle || changeRepeatMode) && (
        <Horizontal style={styles.advancedControlsContainer}>
          {toggleShuffle && (
            <ShuffleModeButton isActive={shuffle} onPress={toggleShuffle} />
          )}
          {changeRepeatMode && (
            <RepeatModeButton
              onChange={changeRepeatMode}
              repeatMode={repeatMode}
              style={styles.endIcon}
            />
          )}
        </Horizontal>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  advancedControlsContainer: {
    justifyContent: 'space-between'
  },
  container: {
    justifyContent: 'center'
  },
  endIcon: {
    alignSelf: 'flex-end'
  },
  icon: {
    backgroundColor: theme.colors.background
  },
  innerIconEnd: {
    paddingStart: 8
  },
  innerIconStart: {
    paddingEnd: 8
  },
  outerIconEnd: {
    paddingStart: 16
  },
  outerIconStart: {
    paddingEnd: 16
  },
  sliderThumb: { height: 16, width: 16 },
  sliderTrack: { height: 6 },
  startIcon: {
    alignSelf: 'flex-start'
  }
}));
