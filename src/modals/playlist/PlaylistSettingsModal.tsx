import { Horizontal, ScreenContainer } from '../../ui';
import { Icon, Input, Text, makeStyles, useTheme } from '@rneui/themed';
import { Platform, TouchableOpacity, View } from 'react-native';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  usePlaylists
} from '../../services';
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
  const { removePlaylist, editPlaylist } = usePlaylists();
  const { theme } = useTheme();

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
    <ScreenContainer
      hasCloseButton={Platform.OS === 'ios'}
      onClose={closeModalHandler}
    >
      <View>
        <Horizontal alignCenter style={styles.renamePlaylistSection}>
          <Input
            autoFocus
            label="Rename the playlist"
            labelStyle={styles.renamePlaylistLabel}
            leftIcon={<Icon name="edit" />}
            onChangeText={(text) => setPlaylistName(text)}
            placeholder="Name your playlist"
            selectionColor={theme.colors.secondary}
            value={playlistName}
          />
        </Horizontal>
        <TouchableOpacity onPress={deleteHandler} style={styles.textButton}>
          <Horizontal alignCenter>
            <Icon color="red" name="delete" />
            <Text style={styles.deleteText}>Delete playlist</Text>
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
