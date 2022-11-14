import React, { FC, useState } from 'react';
import { Input, makeStyles, useTheme } from '@rneui/themed';
import { Button, ModalContainer } from '../../ui';
import { View } from 'react-native';
import { usePlaylists } from '../../services';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';

export const PlaylistCreateModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYLIST_CREATE>
> = ({ navigation: { goBack } }) => {
  const [playlistName, setPlaylistName] = useState('');
  const { theme } = useTheme();
  const styles = useStyles();
  const { addPlaylist, isLoading } = usePlaylists();

  const createHandler = async () => {
    await addPlaylist({
      title: playlistName,
      tracks: [],
      count: 0
    });
    goBack();
  };

  return (
    <ModalContainer>
      <View style={styles.container}>
        <Input
          selectionColor={theme.colors.secondary}
          autoFocus
          value={playlistName}
          placeholder="Name your playlist"
          onChangeText={(text) => setPlaylistName(text)}
        />
        <Button loading={isLoading} onPress={createHandler}>
          Create
        </Button>
      </View>
    </ModalContainer>
  );
};

const useStyles = makeStyles({
  container: {
    alignSelf: 'center',
    height: '80%',
    width: '100%',
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
