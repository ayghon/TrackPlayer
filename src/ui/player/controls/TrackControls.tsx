import { Horizontal } from '../../display';
import { Icon, makeStyles } from '@rneui/themed';
import { ProgressBar } from './ProgressBar';
import { RepeatMode } from 'react-native-track-player';
import { RepeatModeButton } from './RepeatModeButton';
import { ShuffleModeButton } from './ShuffleModeButton';
import { SleepTimerButton } from './SleepTimerButton';
import { SleepTimerDialog } from './SleepTimerDialog';
import {
  SleepTimerState,
  TrackControlsCapability,
  TrackControls as TrackControlsProps
} from '../../../services';
import { View } from 'react-native';
import React, { useState } from 'react';

export const TrackControls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities,
  repeatMode = RepeatMode.Off,
  changeRepeatMode,
  toggleShuffle,
  shuffle = false,
  sleepTimer
}: TrackControlsProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = useStyles();
  const { timerState } = sleepTimer;

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
          <Horizontal alignCenter style={styles.endIcons}>
            <SleepTimerButton
              isActive={timerState === SleepTimerState.ACTIVE}
              onPress={() => setDialogOpen(true)}
            />
            {changeRepeatMode && (
              <RepeatModeButton
                onChange={changeRepeatMode}
                repeatMode={repeatMode}
                style={styles.lastEndIcon}
              />
            )}
          </Horizontal>
        </Horizontal>
      )}
      <SleepTimerDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        sleepTimer={sleepTimer}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  advancedControlsContainer: {
    justifyContent: 'space-between',
    marginTop: 8
  },
  container: {
    justifyContent: 'center'
  },
  endIcons: {
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
  lastEndIcon: {
    marginStart: 8
  },
  outerIconEnd: {
    paddingStart: 16
  },
  outerIconStart: {
    paddingEnd: 16
  }
}));
