import { ConfirmDialog, ScreenContainer, TextInput } from '../../ui';
import { DeletePlaylistButton } from './components/DeletePlaylistButton';
import { Icon } from 'native-base';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { isIOS } from '../../utils';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export type PlaylistSettingsModalProps = {
  playlist: Playlist;
};

export const PlaylistSettingsModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_SETTINGS>
> = ({
  navigation: { pop, navigate },
  route: {
    params: { playlist }
  }
}) => {
  const [playlistName, setPlaylistName] = useState(playlist.title);
  const { removePlaylist, editPlaylist } = usePlaylistsState();
  const { t } = useTranslation();
  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    useState(false);

  const closeConfirmDeleteDialogHandler = () =>
    setConfirmDeleteDialogOpen(false);

  const deleteHandler = async () => {
    await removePlaylist(playlist.id);
    setConfirmDeleteDialogOpen(false);
    pop(2);
  };

  const closeModalHandler = async () => {
    const newList = await editPlaylist(playlist.id, {
      ...playlist,
      title: playlistName
    });
    navigate(Routes.PLAYLIST_VIEW, {
      playlist: newList.find((item) => item.id === playlist.id) || playlist
    });
  };

  return (
    <ScreenContainer hasCloseButton={isIOS} onClose={closeModalHandler}>
      <TextInput
        label={t(i18nKeys.modals.playlist.settings.input.rename_playlist.label)}
        leftElement={<Icon marginRight={2} name="edit" />}
        onChangeText={(text) => setPlaylistName(text)}
        placeholder={t(
          i18nKeys.modals.playlist.settings.input.rename_playlist.placeholder
        )}
        value={playlistName}
      />
      <DeletePlaylistButton onPress={() => setConfirmDeleteDialogOpen(true)} />
      <ConfirmDialog
        close={closeConfirmDeleteDialogHandler}
        confirmButton={{
          onPress: deleteHandler,
          title: t(i18nKeys.button.delete)
        }}
        isOpen={isConfirmDeleteDialogOpen}
        title={t(i18nKeys.dialog.irreversible_action.title)}
      >
        {t(i18nKeys.modals.playlist.settings.dialog.confirm_delete.subtitle, {
          name: playlist.title
        })}
      </ConfirmDialog>
    </ScreenContainer>
  );
};
