import { Button, Center } from 'native-base';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { ScreenContainer, TextInput } from '../../ui';
import { isIOS } from '../../utils';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export const PlaylistCreateModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_CREATE>
> = ({ navigation: { goBack } }) => {
  const [playlistName, setPlaylistName] = useState('');
  const { t } = useTranslation();
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
      <Center height="80%">
        <TextInput
          autoFocus
          marginY={8}
          onChangeText={(text) => setPlaylistName(text)}
          paddingX={8}
          placeholder={t(
            i18nKeys.modals.playlist.create.input.name_playlist.placeholder
          )}
          value={playlistName}
        />
        <Button isLoading={isLoading} onPress={createHandler}>
          {t(i18nKeys.button.create)}
        </Button>
      </Center>
    </ScreenContainer>
  );
};
