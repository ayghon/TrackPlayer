import { Grid, LayoutVariant, ScreenContainer } from '../../ui';
import {
  Playlist,
  RootStackParamList,
  Routes,
  usePlaylists
} from '../../services';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList } from 'react-native';
import { LibraryListItem } from './components/LibraryListItem';

export type LibraryScreenProps = {
  variant?: LayoutVariant;
};

export const LibraryScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.LIBRARY> &
    LibraryScreenProps
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
          renderItem={({ item }) => <LibraryListItem item={item} />}
          keyExtractor={({ title }) => title}
          initialNumToRender={6}
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
