import { Button, ScreenContainer } from '../../ui';
import { Input, makeStyles, useTheme } from '@rneui/themed';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylists
} from '../../services';
import { View } from 'react-native';
import { isIOS } from '../../utils';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export const PlaylistCreateModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_CREATE>
> = ({ navigation: { goBack } }) => {
  const [playlistName, setPlaylistName] = useState('');
  const { t } = useTranslation();
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
    <ScreenContainer hasCloseButton={isIOS}>
      <View style={styles.container}>
        <Input
          autoFocus
          onChangeText={(text) => setPlaylistName(text)}
          placeholder={t(
            i18nKeys.modals.playlist.create.input.name_playlist.placeholder
          )}
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
