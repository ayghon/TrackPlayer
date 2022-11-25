import { Card, makeStyles } from '@rneui/themed';
import { StyleProp, View, ViewStyle } from 'react-native';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type PlaylistTitleSectionProps = {
  title: string;
  trackCount: number;
  style?: StyleProp<ViewStyle>;
};

export const PlaylistTitleSection: FC<PlaylistTitleSectionProps> = ({
  title,
  trackCount,
  style
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <View style={[style]}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Title style={styles.count}>
        {t(i18nKeys.ui.playlist.track_count, { count: trackCount })}
      </Card.Title>
    </View>
  );
};

const useStyles = makeStyles({
  count: {
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 4,
    textAlign: 'left'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 12,
    textAlign: 'left'
  }
});
