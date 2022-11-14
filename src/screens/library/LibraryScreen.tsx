import { Grid, PlaylistItem, ScreenContainer } from '../../ui';
import { Playlist, usePlaylists } from '../../services';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { ActivityIndicator } from 'react-native';

export const LibraryScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.LIBRARY>
> = ({ navigation: { navigate } }) => {
  const { playlists, isLoading } = usePlaylists();

  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Grid<Playlist>
        data={playlists}
        initialNumToRender={6}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => (
          <PlaylistItem
            artwork={item.artwork}
            title={item.title}
            trackCount={item.count}
            onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlist: item })}
          />
        )}
      />
    </ScreenContainer>
  );
};
