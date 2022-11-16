import TrackPlayer, { Event } from 'react-native-track-player';

export const playbackService = async function () {
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
};
