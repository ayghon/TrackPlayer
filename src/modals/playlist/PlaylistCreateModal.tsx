import { Button, ScreenContainer, TextInput } from '../../ui';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { View } from 'react-native';
import { isIOS } from '../../utils';
import { makeStyles } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export const PlaylistCreateModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_CREATE>
> = ({ navigation: { goBack } }) => {
  const [playlistName, setPlaylistName] = useState('');
  const { t } = useTranslation();
  const styles = useStyles();
  const { createPlaylist, isLoading } = usePlaylistsState();

  const createHandler = async () => {
    await createPlaylist({
      count: 0,
      pinned: false,
      title: playlistName,
      tracks: []
    });
    goBack();
  };

  return (
    <ScreenContainer hasCloseButton={isIOS}>
      <View style={styles.container}>
        <TextInput
          autoFocus
          onChange={(text) => setPlaylistName(text)}
          placeholder={t(
            i18nKeys.modals.playlist.create.input.name_playlist.placeholder
          )}
          value={playlistName}
        />
        <Button loading={isLoading} onPress={createHandler}>
          {t(i18nKeys.button.create)}
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
