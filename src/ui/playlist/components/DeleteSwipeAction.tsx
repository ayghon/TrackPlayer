import { Card, makeStyles, Text } from '@rneui/themed';
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
    width: '25%',
    height: '100%',
    margin: 0,
    borderRadius: 6,
    backgroundColor: theme.colors.error,
    borderColor: `${theme.colors.white}80`,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
