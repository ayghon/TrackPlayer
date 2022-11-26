import { ActivityIndicator, FlatList } from 'react-native';
import { Grid, LayoutVariant, ScreenContainer } from '../../ui';
import { Icon, Input, useTheme } from '@rneui/themed';
import { LibraryListItem } from './components/LibraryListItem';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylists
} from '../../services';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';
import debounce from 'lodash.debounce';

export type LibraryScreenProps = {
  variant?: LayoutVariant;
};

export const LibraryScreen: FC<
  RootStackScreenProps<Routes.LIBRARY> & LibraryScreenProps
> = ({ variant = LayoutVariant.LIST }) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { playlists: originalPlaylists, isLoading } = usePlaylists();
  const [list, setList] = useState<Playlist[]>(originalPlaylists);

  if (isLoading && list.length === 0) {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  const searchHandler = (text: string) => {
    setSearch(text);
    debounce(() => {
      if (text.length > 0) {
        setList(
          originalPlaylists.filter(({ title }) =>
            title.match(new RegExp(`${text}*`, 'i'))
          )
        );
      } else {
        setList(originalPlaylists);
      }
    }, 500)();
  };

  if (variant === LayoutVariant.LIST) {
    return (
      <ScreenContainer>
        <Input
          leftIcon={<Icon name="search" />}
          onChangeText={searchHandler}
          placeholder={t(i18nKeys.screens.library.input.search.placeholder)}
          selectionColor={theme.colors.secondary}
          value={search}
        />
        <FlatList
          data={list}
          initialNumToRender={6}
          keyExtractor={({ title }) => title}
          renderItem={({ item }) => <LibraryListItem item={item} />}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Grid<Playlist>
        data={playlists}
        initialNumToRender={6}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => <LibraryListItem item={item} />}
      />
    </ScreenContainer>
  );
};
