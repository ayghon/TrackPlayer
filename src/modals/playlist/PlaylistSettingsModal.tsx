import { BackHandler } from 'react-native';
import { ConfirmDialog, ScreenContainer, TextInput } from '../../ui';
import { DeletePlaylistButton } from './components/DeletePlaylistButton';
import { Icon } from 'native-base';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { isAndroid, isIOS } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React, { FC, useCallback, useState } from 'react';

export type PlaylistSettingsModalProps = {
  playlistId: string;
};

export const PlaylistSettingsModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_SETTINGS>
> = ({
  navigation: { pop, navigate },
  route: {
    params: { playlistId }
  }
}) => {
  const { removePlaylist, editPlaylist, getPlaylist } = usePlaylistsState();
  const playlist = getPlaylist(playlistId);
  const [playlistName, setPlaylistName] = useState(playlist?.title ?? '');
  const { t } = useTranslation();
  const [isConfirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    useState(false);

  const closeConfirmDeleteDialogHandler = () =>
    setConfirmDeleteDialogOpen(false);

  const deleteHandler = async () => {
    if (!playlist) {
      return null;
    }

    await removePlaylist(playlist.id);
    setConfirmDeleteDialogOpen(false);
    pop(2);
  };

  const closeModalHandler = useCallback(async () => {
    if (!playlist) {
      return null;
    }

    const newList = await editPlaylist(playlist.id, {
      ...playlist,
      title: playlistName
    });
    navigate(Routes.PLAYLIST_VIEW, {
      playlistId:
        newList.find((item) => item.id === playlist.id)?.id ?? playlist.id
    });
  }, [editPlaylist, navigate, playlist, playlistName]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        closeModalHandler();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [closeModalHandler])
  );

  return (
    <ScreenContainer
      hasBackButton={isAndroid}
      hasCloseButton={isIOS}
      onClose={closeModalHandler}
    >
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
          name: playlist?.title ?? ''
        })}
      </ConfirmDialog>
    </ScreenContainer>
  );
};
