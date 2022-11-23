import { Icon, makeStyles } from '@rneui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';
import { View } from 'react-native';
import React from 'react';

export const LibraryHeaderRight = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Icon name="add" onPress={() => navigate(Routes.PLAYLIST_CREATE)} />
    </View>
  );
};

const useStyles = makeStyles({
  container: {
    paddingHorizontal: 16
  }
});
