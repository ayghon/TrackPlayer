import { Center, Icon, Row, Stack } from 'native-base';
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
  const { timerState } = sleepTimer;

  const icons = [
    {
      capability: TrackControlsCapability.SKIP_TO_PREVIOUS,
      name: 'skip-previous'
    },
    {
      capability: TrackControlsCapability.JUMP_BACKWARD,
      name: 'fast-rewind'
    },
    {
      capability: TrackControlsCapability.PLAY_PAUSE,
      name: isPlaying ? 'play-arrow' : 'pause'
    },
    {
      capability: TrackControlsCapability.JUMP_FORWARD,
      name: 'fast-forward'
    },
    {
      capability: TrackControlsCapability.SKIP_TO_NEXT,
      name: 'skip-next'
    }
  ];

  return (
    <Stack space={2}>
      <ProgressBar
        duration={duration}
        onProgressChange={onProgressChange}
        position={position}
      />
      <Center>
        <Row alignItems="center" space={2}>
          {icons.map(({ capability, name }) => (
            <Icon
              color={
                capabilities[capability].disabled ? undefined : 'text.primary'
              }
              disabled={capabilities[capability].disabled}
              key={capability}
              name={name}
              onPress={capabilities[capability].onPress}
              size="6xl"
            />
          ))}
        </Row>
      </Center>
      {(toggleShuffle || changeRepeatMode) && (
        <Row justifyContent="space-between">
          {toggleShuffle && (
            <ShuffleModeButton isActive={shuffle} onPress={toggleShuffle} />
          )}
          <Row alignSelf="flex-end" space={2}>
            <SleepTimerButton
              isActive={timerState === SleepTimerState.ACTIVE}
              onPress={() => setDialogOpen(true)}
            />
            {changeRepeatMode && (
              <RepeatModeButton
                onChange={changeRepeatMode}
                repeatMode={repeatMode}
              />
            )}
          </Row>
        </Row>
      )}
      <SleepTimerDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        sleepTimer={sleepTimer}
      />
    </Stack>
  );
};
