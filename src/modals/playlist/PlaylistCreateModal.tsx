import { Button, ScreenContainer } from '../../ui';
import { Input, makeStyles, useTheme } from '@rneui/themed';
import { Platform, View } from 'react-native';
import {
  RootStackScreenProps,
  Routes
} from '../../services/routes/routes.types';
import { usePlaylists } from '../../services';
import React, { FC, useState } from 'react';

export const PlaylistCreateModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_CREATE>
> = ({ navigation: { goBack } }) => {
  const [playlistName, setPlaylistName] = useState('');
  const { theme } = useTheme();
  const styles = useStyles();
  const { addPlaylist, isLoading } = usePlaylists();

  const createHandler = async () => {
    await addPlaylist({
      count: 0,
      title: playlistName,
      tracks: []
    });
    goBack();
  };

  return (
    <ScreenContainer hasCloseButton={Platform.OS === 'ios'}>
      <View style={styles.container}>
        <Input
          autoFocus
          onChangeText={(text) => setPlaylistName(text)}
          placeholder="Name your playlist"
          selectionColor={theme.colors.secondary}
          value={playlistName}
        />
        <Button loading={isLoading} onPress={createHandler}>
          Create
        </Button>
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    height: '80%',
    justifyContent: 'center',
    paddingHorizontal: 40,
    width: '100%'
  }
});
