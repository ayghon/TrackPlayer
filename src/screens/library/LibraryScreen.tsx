import { ActivityIndicator, FlatList } from 'react-native';
import { Grid, LayoutVariant, ScreenContainer } from '../../ui';
import { LibraryListItem } from './components/LibraryListItem';
import { LibrarySearchBar } from './components/LibrarySearchBar';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  usePlaylistsState
} from '../../services';
import { useFocusEffect } from '@react-navigation/native';
import React, { FC, useCallback, useState } from 'react';

export type LibraryScreenProps = {
  variant?: LayoutVariant;
};

export const LibraryScreen: FC<
  RootStackScreenProps<Routes.LIBRARY> & LibraryScreenProps
> = ({ variant = LayoutVariant.LIST }) => {
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
        <ActivityIndicator />
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

  if (variant === LayoutVariant.LIST) {
    return (
      <ScreenContainer>
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
              pinHandler={pinHandler}
            />
          )}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Grid<Playlist>
        data={searchList}
        initialNumToRender={6}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => <LibraryListItem item={item} />}
      />
    </ScreenContainer>
  );
};
