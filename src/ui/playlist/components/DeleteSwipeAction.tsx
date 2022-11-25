import { Card, Text, makeStyles } from '@rneui/themed';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const DeleteSwipeAction = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Card containerStyle={styles.deleteContainer}>
      <Text>{t(i18nKeys.ui.playlist.swipe_action.delete)}</Text>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  deleteContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.error,
    borderColor: `${theme.colors.white}80`,
    borderRadius: 6,
    height: '100%',
    justifyContent: 'center',
    margin: 0,
    width: '25%'
  }
}));
