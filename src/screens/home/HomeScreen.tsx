import { Carousel, PlaylistItem, ScreenContainer } from '../../ui';
import React, { FC } from 'react';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Playlist, playlists } from '../../services';
import { makeStyles, Text } from '@rneui/themed';

export const HomeScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.HOME>
> = ({ navigation: { navigate } }) => {
  const styles = useStyles();

  return (
    <ScreenContainer>
      <Text style={styles.recentlyPlayed}>Recently played</Text>
      <Carousel<Playlist>
        enableGradient={false}
        data={playlists.slice(0, 3)}
        initialNumToRender={3}
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

const useStyles = makeStyles({
  recentlyPlayed: { marginBottom: 8, fontWeight: '600', fontSize: 16 }
});
