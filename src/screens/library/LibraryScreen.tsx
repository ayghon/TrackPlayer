import { Grid, PlaylistItem, ScreenContainer } from '../../ui';
import { Playlist, playlists } from '../../services';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';

export const LibraryScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.LIBRARY>
> = ({ navigation: { navigate } }) => {
  return (
    <ScreenContainer>
      <Grid<Playlist>
        data={playlists}
        initialNumToRender={6}
        keyExtractor={({ title }) => title}
        renderItem={({ item: { tracks, title, artwork, count } }) => (
          <PlaylistItem
            artwork={artwork}
            title={title}
            trackCount={count}
            onPress={() => navigate(Routes.PLAYER, { tracks })}
          />
        )}
      />
    </ScreenContainer>
  );
};
