import { ActivityIndicator, FlatList } from 'react-native';
import { Grid, LayoutVariant, ScreenContainer } from '../../ui';
import { LibraryListItem } from './components/LibraryListItem';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  usePlaylists
} from '../../services';
import React, { FC } from 'react';

export type LibraryScreenProps = {
  variant?: LayoutVariant;
};

export const LibraryScreen: FC<
  RootStackScreenProps<Routes.LIBRARY> & LibraryScreenProps
> = ({ variant = LayoutVariant.LIST }) => {
  const { playlists, isLoading } = usePlaylists();

  if (isLoading && playlists.length === 0) {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  if (variant === LayoutVariant.LIST) {
    return (
      <ScreenContainer>
        <FlatList
          data={playlists}
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
