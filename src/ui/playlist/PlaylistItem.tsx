import { Card, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from '../image';
import { LayoutVariant } from './playlist.types';

export type PlaylistItemProps = {
  trackCount: number;
  title: string;
  artwork?: string;
  onPress?: () => void;
  variant?: LayoutVariant;
};

export const PlaylistItem: FC<PlaylistItemProps> = ({
  trackCount,
  title,
  artwork,
  onPress,
  variant = LayoutVariant.LIST
}) => {
  const styles = useStyles();

  if (variant === LayoutVariant.LIST) {
    return (
      <TouchableOpacity
        style={styles.buttonList}
        activeOpacity={0.75}
        onPress={onPress}
      >
        <Card
          containerStyle={styles.containerList}
          wrapperStyle={styles.wrapperList}
        >
          <Image
            containerStyle={styles.imageList}
            source={artwork ? { uri: artwork } : undefined}
          />
          <View style={styles.titleSectionList}>
            <Card.Title style={styles.title}>{title}</Card.Title>
            <Card.Title style={styles.count}>{trackCount} tracks</Card.Title>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.buttonGrid}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Card containerStyle={styles.containerGrid}>
        <Image
          containerStyle={styles.imageGrid}
          source={artwork ? { uri: artwork } : undefined}
        />
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Title style={styles.count}>{trackCount} tracks</Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  loader: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.background
  },
  imageList: {
    height: 40,
    width: 40
  },
  imageGrid: {
    height: 128,
    width: 128
  },
  buttonList: {
    marginBottom: 8,
    width: '100%'
  },
  buttonGrid: {
    height: 220,
    width: 160
  },
  titleSectionList: {
    marginStart: 16
  },
  wrapperList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  containerList: {
    width: '100%',
    margin: 0,
    borderRadius: 6,
    backgroundColor: `${theme.colors.white}80`,
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: `${theme.colors.white}80`
  },
  containerGrid: {
    margin: 0,
    borderRadius: 6,
    backgroundColor: `${theme.colors.white}80`,
    padding: 16,
    height: '100%',
    width: '100%',
    borderColor: `${theme.colors.white}80`
  },
  title: {
    textAlign: 'left',
    marginTop: 12,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 16
  },
  count: {
    marginTop: 4,
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 14
  }
}));
