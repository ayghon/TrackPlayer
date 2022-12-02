import { Horizontal, ScreenContainer, TextInput } from '../../ui';
import { Icon, Text, makeStyles } from '@rneui/themed';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { TouchableOpacity, View } from 'react-native';
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
  const styles = useStyles();
  const { removePlaylist, editPlaylist } = usePlaylistsState();
  const { t } = useTranslation();

  const deleteHandler = async () => {
    await removePlaylist(playlist.id);
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
      <View>
        <Horizontal alignCenter style={styles.renamePlaylistSection}>
          <TextInput
            label={t(
              i18nKeys.modals.playlist.settings.input.rename_playlist.label
            )}
            labelStyle={styles.renamePlaylistLabel}
            leftIcon={<Icon name="edit" />}
            onChange={(text) => setPlaylistName(text)}
            placeholder={t(
              i18nKeys.modals.playlist.settings.input.rename_playlist
                .placeholder
            )}
            value={playlistName}
          />
        </Horizontal>
        <TouchableOpacity onPress={deleteHandler} style={styles.textButton}>
          <Horizontal alignCenter>
            <Icon color="red" name="delete" />
            <Text style={styles.deleteText}>
              {t(i18nKeys.modals.playlist.settings.button.delete_playlist)}
            </Text>
          </Horizontal>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  deleteText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 4
  },
  renamePlaylistLabel: {
    color: theme.colors.black,
    fontSize: 16
  },
  renamePlaylistSection: {
    marginVertical: 16
  },
  textButton: {
    alignSelf: 'flex-start',
    padding: 8
  }
}));
