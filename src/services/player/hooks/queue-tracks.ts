import { useCallback } from 'react';
import { usePlayerState } from '../player.context';
import { usePlaylistsState } from '../../playlists';
import TrackPlayer, { Track } from 'react-native-track-player';

export type QueueTracksProps = {
  tracks?: Track[];
  position?: number;
  index?: number;
  continueCurrent?: boolean;
  autoPlay?: boolean;
};

export const useQueueTracks = (playlistId: string) => {
  const { getPlaylist } = usePlaylistsState();
  const { setQueue, setPlaylist } = usePlayerState();

  const playlist = getPlaylist(playlistId || '');

  const queueTracks = useCallback(
    async ({
      tracks,
      continueCurrent,
      autoPlay,
      index,
      position
    }: QueueTracksProps) => {
      if (playlist && setPlaylist) {
        setPlaylist(playlist);
      }

      if (!continueCurrent && tracks) {
        setQueue(tracks);

        // clean previous queue
        await TrackPlayer.reset();
        // create new queue
        await TrackPlayer.add(tracks);

        if (typeof index !== 'undefined' && index >= 0) {
          await TrackPlayer.skip(index);
        }

        if (typeof position !== 'undefined' && position > 0) {
          await TrackPlayer.seekTo(position);
        }

        if (autoPlay) {
          await TrackPlayer.play();
        }
      }
    },
    [playlist, setPlaylist, setQueue]
  );

  return { queueTracks };
};
