import React, { useState } from 'react';
import { Input, makeStyles, useTheme } from '@rneui/themed';
import { Button, ScreenContainer } from '../../ui';
import { View } from 'react-native';

export const CreatePlaylistModal = () => {
  const [playlistName, setPlaylistName] = useState('');
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Input
          selectionColor={theme.colors.secondary}
          autoFocus
          value={playlistName}
          placeholder="Name your playlist"
          onChangeText={(text) => setPlaylistName(text)}
        />
        <Button>Create</Button>
      </View>
    </ScreenContainer>
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
