import { Icon, Input, useTheme } from '@rneui/themed';
import { Playlist, i18nKeys, usePlaylistsState } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import debounce from 'lodash.debounce';

export type LibrarySearchBarProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchList: Playlist[];
  setSearchList: Dispatch<SetStateAction<Playlist[]>>;
};

export const LibrarySearchBar: FC<LibrarySearchBarProps> = ({
  search,
  setSearch,
  searchList,
  setSearchList
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { orderedPlaylists: originalPlaylists, isLoading } =
    usePlaylistsState();

  // init search list content when originalPlaylists are loaded
  useEffect(() => {
    if (
      !isLoading &&
      (searchList.length === 0 ||
        searchList.length < originalPlaylists.length) &&
      search.length === 0
    ) {
      setSearchList(originalPlaylists);
    }
  }, [
    isLoading,
    originalPlaylists,
    searchList.length,
    setSearchList,
    search.length
  ]);

  const searchHandler = (text: string) => {
    setSearch(text);
    debounce(() => {
      if (text.length > 0) {
        setSearchList((state) =>
          state.filter(({ title }) => title.match(new RegExp(`${text}*`, 'i')))
        );
      } else {
        setSearchList(originalPlaylists);
      }
    }, 200)();
  };

  return (
    <Input
      leftIcon={<Icon name="search" />}
      onChangeText={searchHandler}
      placeholder={t(i18nKeys.screens.library.input.search.placeholder)}
      selectionColor={theme.colors.secondary}
      value={search}
    />
  );
};
