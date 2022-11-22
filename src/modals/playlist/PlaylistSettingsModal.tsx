import { TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Playlist,
  RootStackParamList,
  Routes,
  usePlaylists
} from '../../services';
import { Horizontal, ScreenContainer } from '../../ui';
import { Icon, makeStyles, Text } from '@rneui/themed';

export type PlaylistSettingsModalProps = {
  playlist: Playlist;
};

export const PlaylistSettingsModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYLIST_SETTINGS>
> = ({
  navigation: { pop },
  route: {
    params: { playlist }
  }
}) => {
  const styles = useStyles();
  const { removePlaylist } = usePlaylists();

  const deleteHandler = async () => {
    await removePlaylist(playlist);
    pop(2);
  };

  return (
    <ScreenContainer hasCloseButton>
      <View>
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

const useStyles = makeStyles({
  textButton: {
    alignSelf: 'flex-start'
  },
  deleteText: {
    color: 'red',
    marginStart: 8
  }
});
