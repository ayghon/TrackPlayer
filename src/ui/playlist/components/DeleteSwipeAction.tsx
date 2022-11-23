import { Card, Text, makeStyles } from '@rneui/themed';
import React from 'react';

export const DeleteSwipeAction = () => {
  const styles = useStyles();

  return (
    <Card containerStyle={styles.deleteContainer}>
      <Text>Delete</Text>
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
