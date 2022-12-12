import { DateTime } from 'luxon';
import { StorageKeys } from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { Event } from 'react-native-track-player';

// async necessary for this function, otherwise android crashes on player init
// eslint-disable-next-line require-await
export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext()
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious()
  );
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) =>
    TrackPlayer.seekTo(event.position)
  );
  TrackPlayer.addEventListener(Event.RemoteJumpForward, (event) =>
    TrackPlayer.seekTo(event.interval)
  );
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, (event) =>
    TrackPlayer.seekTo(-event.interval)
  );
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
    const sleepTimer = await AsyncStorage.getItem(StorageKeys.SLEEP_TIMER);

    if (sleepTimer && DateTime.fromISO(sleepTimer) <= DateTime.now()) {
      await AsyncStorage.removeItem(StorageKeys.SLEEP_TIMER);
      await TrackPlayer.pause();
    }
  });
}
