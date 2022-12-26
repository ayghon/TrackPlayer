import { DateTime } from 'luxon';
import { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { SleepTimerState } from '../player.types';
import { StorageKeys } from '../../storage';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UseSleepTimerResponse = {
  startTimer: (duration: number) => void;
  timerState: SleepTimerState;
  resetTimer: () => void;
};

export const useSleepTimer = (): UseSleepTimerResponse => {
  const [timerState, setTimerState] = useState<SleepTimerState>(
    SleepTimerState.IDLE
  );

  const startTimer = useCallback(async (minutes: number) => {
    await AsyncStorage.setItem(
      StorageKeys.SLEEP_TIMER,
      DateTime.now().plus({ minute: minutes }).toISO()
    );
    setTimerState(SleepTimerState.ACTIVE);
  }, []);

  useTrackPlayerEvents([Event.PlaybackProgressUpdated], async () => {
    const sleepTimer = await AsyncStorage.getItem(StorageKeys.SLEEP_TIMER);

    if (sleepTimer) {
      if (timerState !== SleepTimerState.ACTIVE) {
        setTimerState(SleepTimerState.ACTIVE);
      }
    } else if (timerState !== SleepTimerState.IDLE) {
      setTimerState(SleepTimerState.IDLE);
    }
  });

  const resetTimer = useCallback(async () => {
    await AsyncStorage.removeItem(StorageKeys.SLEEP_TIMER);
    setTimerState(SleepTimerState.IDLE);
  }, []);

  return { resetTimer, startTimer, timerState };
};
