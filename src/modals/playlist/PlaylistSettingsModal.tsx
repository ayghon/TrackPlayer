import { Platform, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Playlist,
  RootStackParamList,
  Routes,
  usePlaylists
} from '../../services';
import { Horizontal, ScreenContainer } from '../../ui';
import { Icon, Input, makeStyles, Text, useTheme } from '@rneui/themed';

export type PlaylistSettingsModalProps = {
  playlist: Playlist;
};

export const PlaylistSettingsModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYLIST_SETTINGS>
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
            leftIcon={<Icon name="edit" />}
            label="Rename the playlist"
            labelStyle={styles.renamePlaylistLabel}
            selectionColor={theme.colors.secondary}
            autoFocus
            value={playlistName}
            placeholder="Name your playlist"
            onChangeText={(text) => setPlaylistName(text)}
          />
        </Horizontal>
        <TouchableOpacity onPress={deleteHandler} style={styles.textButton}>
          <Horizontal alignCenter>
            <Icon name="delete" color="red" />
            <Text style={styles.deleteText}>Delete playlist</Text>
          </Horizontal>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  textButton: {
    padding: 8,
    alignSelf: 'flex-start'
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginStart: 4
  },
  renamePlaylistSection: {
    marginVertical: 16
  },
  renamePlaylistLabel: {
    color: theme.colors.black,
    fontSize: 16
  }
}));
