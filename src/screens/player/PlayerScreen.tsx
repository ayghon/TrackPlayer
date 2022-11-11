import { Text } from 'react-native';
import React from 'react';
import { makeStyles } from '@rneui/themed';
import { Controls, ScreenContainer } from '../../ui';
import TrackPlayer, { Track } from 'react-native-track-player';
import { Button } from '@rneui/base';
import { useInitPlayer, usePlayerControls } from '../../services';

const tracks: Track[] = [
  {
    url: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3',
    title: '0001',
    artist: 'bigsoundbank',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00',
    duration: 26
  },
  {
    url: 'https://bigsoundbank.com/UPLOAD/mp3/0002.mp3',
    title: '0002',
    artist: 'bigsoundbank',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00',
    duration: 21
  },
  {
    url: 'https://bigsoundbank.com/UPLOAD/mp3/0003.mp3',
    title: '0003',
    artist: 'bigsoundbank',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00',
    duration: 12
  }
];

export const PlayerScreen = () => {
  const styles = useStyles();
  useInitPlayer();

  const { controlsProps, currentTrack, setQueue } = usePlayerControls();

  const addTracks = async () => {
    setQueue(tracks);
    await TrackPlayer.add(tracks);
  };

  return (
    <ScreenContainer>
      <Text style={styles.text}>{currentTrack?.title}</Text>
      <Controls {...controlsProps} />
      <Button title="Add tracks" onPress={addTracks} />
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.colors.black
  }
}));
