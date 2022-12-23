import { Row, StyledProps, Text } from 'native-base';
import React, { FC } from 'react';

export type PlaylistItemSwipeActionProps = StyledProps & {
  label: string;
};

export const PlaylistItemSwipeAction: FC<PlaylistItemSwipeActionProps> = ({
  label,
  ...rest
}) => {
  return (
    <Row
      alignItems="center"
      borderRadius="md"
      justifyContent="center"
      width="25%"
      {...rest}
    >
      <Text>{label}</Text>
    </Row>
  );
};
