import { Card, Text, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';

export type PlaylistItemSwipeActionProps = {
  backgroundColor: string;
  label: string;
};

export const PlaylistItemSwipeAction: FC<PlaylistItemSwipeActionProps> = ({
  backgroundColor,
  label
}) => {
  const styles = useStyles({ backgroundColor });

  return (
    <Card containerStyle={styles.container}>
      <Text>{label}</Text>
    </Card>
  );
};

const useStyles = makeStyles(
  (theme, { backgroundColor }: { backgroundColor: string }) => ({
    container: {
      alignItems: 'center',
      backgroundColor,
      borderColor: `${theme.colors.white}80`,
      borderRadius: 6,
      height: '100%',
      justifyContent: 'center',
      margin: 0,
      width: '25%'
    }
  })
);
