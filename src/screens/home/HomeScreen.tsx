import { Carousel, PlaylistItem, ScreenContainer } from '../../ui';
import React, { FC } from 'react';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Playlist, playlists } from '../../services';

export const HomeScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.HOME>
> = ({ navigation: { navigate } }) => {
  return (
    <ScreenContainer>
      <Carousel<Playlist>
        data={playlists}
        initialNumToRender={3}
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
