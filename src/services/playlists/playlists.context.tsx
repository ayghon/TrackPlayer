import { UsePlaylistsResponse } from './playlists.types';
import { usePlaylists } from './playlists';
import React, { FC, PropsWithChildren, createContext, useContext } from 'react';

const initialValue: UsePlaylistsResponse = {
  createPlaylist: () => Promise.resolve([]),
  editPlaylist: () => Promise.resolve([]),
  getPlaylists: () => Promise.resolve([]),
  isLoading: false,
  orderedPlaylists: [],
  playlists: [],
  removePlaylist: () => Promise.resolve([])
};

const PlaylistsContext = createContext<UsePlaylistsResponse>(initialValue);

export const PlaylistsProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = usePlaylists();

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylistsState = () => {
  const context = useContext(PlaylistsContext);

  if (!context) {
    throw new Error('Playlists Context: Provider is missing');
  }

  return context;
};