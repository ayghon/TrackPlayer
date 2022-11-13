import { View } from 'react-native';
import { Icon, makeStyles } from '@rneui/themed';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';

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
