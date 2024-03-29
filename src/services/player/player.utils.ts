import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Playlist } from '../playlists';
import { TrackControls, TrackControlsCapability } from './player.types';
import { useSleepTimer } from './hooks/sleep-timer';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  State,
  Track,
  useProgress,
  useTrackPlayerEvents
} from 'react-native-track-player';

const getRandomPositionInQueue = (queueLength: number) =>
  Math.ceil(Math.random() * queueLength);

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
        ],

        // The buttons that it will show in the notification on Android
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ],
        progressUpdateEventInterval: 2
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
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
  controls: TrackControls;
  playlist?: Playlist;
  setPlaylist?: Dispatch<SetStateAction<Playlist | undefined>>;
};

export const usePlayerControls = (): UsePlayerControlsResponse => {
  const [playerState, setPlayerState] = useState<State>();
  const [currentTrack, setCurrentTrack] = useState<TrackInQueue>();
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Queue);
  const [shuffle, setShuffle] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist>();

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async (event) => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);

        if (track) {
          setCurrentTrack({
            ...track,
            index: event.nextTrack
          });
        }
      }
      if (event.type === Event.PlaybackState) {
        setPlayerState(event.state);
      }
    }
  );

  const { position, duration = 26 } = useProgress();

  // BASIC handlers
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
  };

  // REPEAT MODE handlers
  const repeatModeHandler = async (mode: RepeatMode) => {
    await TrackPlayer.setRepeatMode(mode);
    setRepeatMode(mode);
  };

  // SHUFFLE handlers
  const getShuffledPosition = useCallback((): number => {
    const randomPositionInQueue = getRandomPositionInQueue(queue.length);

    return randomPositionInQueue !== position
      ? randomPositionInQueue
      : getShuffledPosition();
  }, [position, queue.length]);
  const toggleShuffle = () => setShuffle((state) => !state);
  const shuffleTrack = () => TrackPlayer.skip(getShuffledPosition());

  // SLEEP TIMER handlers
  const sleepTimer = useSleepTimer();

  return {
    controls: {
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
            !currentTrack ||
            (isLastTrack(currentTrack.index, queue.length) &&
              repeatMode !== RepeatMode.Queue),
          onPress: shuffle ? shuffleTrack : skipToNextTrack
        },
        [TrackControlsCapability.SKIP_TO_PREVIOUS]: {
          disabled: !currentTrack || isFirstTrack(currentTrack.index),
          onPress: shuffle ? shuffleTrack : skipToPreviousTrack
        }
      },
      changeRepeatMode: repeatModeHandler,
      duration: duration || 26,
      isPlaying:
        playerState !== State.Playing && playerState !== State.Buffering,
      onProgressChange: TrackPlayer.seekTo,
      position,
      repeatMode,
      shuffle,
      sleepTimer,
      toggleShuffle
    },
    currentTrack,
    playlist,
    queue,
    setCurrentTrack,
    setPlaylist,
    setQueue
  };
};
