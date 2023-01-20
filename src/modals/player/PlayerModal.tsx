import {
  RootStackScreenProps,
  Routes,
  usePlayerState,
  usePlaylistsState,
  useQueueTracks
} from '../../services';
import { ScreenContainer, TrackView } from '../../ui';
import { Spinner } from 'native-base';
import React, { FC, useEffect } from 'react';

export type PlayerModalProps = {
  position?: number;
  index?: number;
  playlistId?: string;
  continueCurrent?: boolean;
  autoPlay?: boolean;
};

export const PlayerModal: FC<RootStackScreenProps<Routes.PLAYER>> = ({
  navigation: { setOptions },
  route: {
    params: {
      continueCurrent = false,
      autoPlay = true,
      position = 0,
      index = 0,
      playlistId
    }
  }
}) => {
  const { getPlaylist } = usePlaylistsState();
  const { controls, currentTrack, queue } = usePlayerState();
  const { queueTracks } = useQueueTracks(playlistId || '');
  const playlist = getPlaylist(playlistId || '');

  useEffect(() => {
    if (playlist) {
      setOptions({ title: playlist.title });
    }
  }, [playlist, setOptions]);

  useEffect(() => {
    queueTracks({ autoPlay, continueCurrent, index, position });
  }, [autoPlay, continueCurrent, index, position, queueTracks]);

  if (!currentTrack || queue.length === 0) {
    return <Spinner />;
  }

  return (
    <ScreenContainer>
      <TrackView
        artist={currentTrack.artist}
        artwork={currentTrack?.artwork as string}
        controlsProps={controls}
        title={currentTrack.title}
      />
    </ScreenContainer>
  );
};
