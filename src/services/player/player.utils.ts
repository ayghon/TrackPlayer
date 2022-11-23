import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Playlist } from '../playlists';
import { TrackControlsCapability, TrackControlsProps } from '../../ui';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  State,
  Track,
  useProgress,
  useTrackPlayerEvents
} from 'react-native-track-player';

export const useInitPlayer = () => {
  useEffect(() => {
    const initPlayer = async () => {
      await TrackPlayer.setupPlayer().catch(() =>
        console.log('TrackPlayer: Already initialised')
      );
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
        },

        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ]
      });
    };
    initPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);
};

export type TrackInQueue = Track & {
  index: number;
};

const isLastTrack = (trackIndex: number, queueLength: number) =>
  !!trackIndex && queueLength - 1 === trackIndex;
const isFirstTrack = (trackIndex: number) => trackIndex === 0;

export type UsePlayerControlsResponse = {
  queue: Track[];
  setQueue: Dispatch<SetStateAction<Track[]>>;
  currentTrack?: TrackInQueue;
  setCurrentTrack: Dispatch<SetStateAction<TrackInQueue | undefined>>;
  controlsProps: TrackControlsProps;
  playlist?: Playlist;
  setPlaylist?: Dispatch<SetStateAction<Playlist | undefined>>;
};

export const usePlayerControls = (): UsePlayerControlsResponse => {
  const [playerState, setPlayerState] = useState<State>();
  const [currentTrack, setCurrentTrack] = useState<TrackInQueue>();
  const [queue, setQueue] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Playlist>();

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.RemotePlay, Event.RemotePause],
    async (event) => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const index = await TrackPlayer.getCurrentTrack();

        if (track) {
          setCurrentTrack({ ...track, index: index || 0 });
        }
      }
    }
  );

  const { position, duration = 26 } = useProgress();

  const skipToNextTrack = () => TrackPlayer.skipToNext();
  const skipToPreviousTrack = () => TrackPlayer.skipToPrevious();
  const jumpForwardInTrack = () => TrackPlayer.seekTo(position + 15);
  const jumpBackwardInTrack = () => TrackPlayer.seekTo(position - 15);

  const startTrack = async () => {
    const state = await TrackPlayer.getState();
    if (state !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }

    const newState = await TrackPlayer.getState();
    setPlayerState(newState);
  };

  return {
    controlsProps: {
      capabilities: {
        [TrackControlsCapability.JUMP_BACKWARD]: {
          disabled: !currentTrack,
          onPress: jumpBackwardInTrack
        },
        [TrackControlsCapability.JUMP_FORWARD]: {
          disabled: !currentTrack,
          onPress: jumpForwardInTrack
        },
        [TrackControlsCapability.PLAY_PAUSE]: {
          disabled: !currentTrack,
          onPress: startTrack
        },
        [TrackControlsCapability.SKIP_TO_NEXT]: {
          disabled:
            !currentTrack || isLastTrack(currentTrack.index, queue.length),
          onPress: skipToNextTrack
        },
        [TrackControlsCapability.SKIP_TO_PREVIOUS]: {
          disabled: !currentTrack || isFirstTrack(currentTrack.index),
          onPress: skipToPreviousTrack
        }
      },
      duration: duration || 26,
      isPlaying:
        playerState !== State.Playing && playerState !== State.Buffering,
      onProgressChange: TrackPlayer.seekTo,
      position
    },
    currentTrack,
    playlist,
    queue,
    setCurrentTrack,
    setPlaylist,
    setQueue
  };
};
