import { FlatList, Spinner, Stack } from 'native-base';
import { LibraryListItem } from './components/LibraryListItem';
import { LibrarySearchBar } from './components/LibrarySearchBar';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  usePlaylistsState
} from '../../services';
import { ScreenContainer } from '../../ui';
import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback, useState } from 'react';

export const LibraryScreen: FC<RootStackScreenProps<Routes.LIBRARY>> = () => {
  const [search, setSearch] = useState('');
  const { isLoading, editPlaylist, removePlaylist, getPlaylists } =
    usePlaylistsState();
  const [searchList, setSearchList] = useState<Playlist[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPlaylists().then((res) => {
        setSearchList(res);
      });
    }, [getPlaylists])
  );

  if (isLoading && searchList.length === 0) {
    return (
      <ScreenContainer>
        <Spinner />
      </ScreenContainer>
    );
  }

  const pinHandler = async (item: Playlist) => {
    const newList = await editPlaylist(item.id, { pinned: !item.pinned });
    setSearchList(newList);
  };

  const deleteHandler = async (itemId: string) => {
    const newList = await removePlaylist(itemId);
    setSearchList(newList);
  };

  return (
    <ScreenContainer>
      <Stack space={4}>
        <LibrarySearchBar
          search={search}
          searchList={searchList}
          setSearch={setSearch}
          setSearchList={setSearchList}
        />
        <FlatList
          data={searchList}
          initialNumToRender={6}
          keyExtractor={({ title }) => title}
          renderItem={({ item }) => (
            <LibraryListItem
              deleteHandler={deleteHandler}
              item={item}
              marginBottom={2}
              pinHandler={pinHandler}
            />
          )}
        />
      </Stack>
    </ScreenContainer>
  );
};
